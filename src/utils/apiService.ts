import isEmail from 'validator/es/lib/isEmail';

export enum ApiActions {
  SUBSCRIBE = '/api/subscribe',
  ASK = '/api/contact',
}

export type QueryResponse<T> = {
  controller: AbortController;
  response: Promise<T>;
};

export class ApiServiceError extends Error {
  readonly name = 'ApiServiceError';

  constructor(public humanError: string, devError: string) {
    super(devError);
  }

  getHumanError() {
    return this.humanError;
  }
}

type ApiServiceMethodType<Payload, Return> = (
    payload: Payload,
    ref: string,
    behavior: 'debounce' | 'reset'
) => QueryResponse<Return>;

export class ApiService {
  private static memo: { [ref: string]: QueryResponse<any> | null } = {};

  private static query<T>(
      context: string,
      ref: string,
      endpoint: ApiActions,
      payload?: object,
      options: RequestInit = {}
  ): QueryResponse<T> {
    const controller = new AbortController();
    const res = {
      controller,
      response: fetch(
          this.getAction(endpoint),
          Object.assign(
              {
                headers: {
                  'content-type': 'application/json',
                },
                signal: controller.signal,
              },
              payload && {
                method: 'POST',
                body: JSON.stringify(payload),
              },
              options
          )
      ).then(async (res) => {
        ApiService.memo[ref] = null;
        let data = await res.text();
        data = await res.json().catch(() => data);
        if (res.status !== 200) {
          throw new ApiServiceError(
              data,
              `[ApiService] - ${context} - Server Error ${res.status} - ${data}`
          );
        }

        return data as unknown as T;
      }),
    };
    ApiService.memo[ref] = res;
    return res;
  }

  static getAction(endpoint: ApiActions) {
    return `${process.env.GATSBY_API_URL}${endpoint}`;
  }

  static subscribe: ApiServiceMethodType<{ email: string, captchaToken: string }, string> = (
      payload,
      ref,
      behavior
  ) => {
    if (!isEmail(payload.email)) {
      throw new ApiServiceError(
          'Please provide a valid email',
          `[ApiService] - Email Subscribe - Bad Input - ${payload.email}`
      );
    }

    if (ApiService.memo[ref]) {
      if (behavior === 'reset') {
        ApiService.memo[ref]!.controller.abort();
      } else if (behavior === 'debounce') {
        throw new ApiServiceError(
            'Request pending. Please try again later',
            `[ApiService] - Email Subscribe - Debounced - ${ref}`
        );
      }
    }

    return ApiService.query(
        'Email Subscribe',
        ref,
        ApiActions.SUBSCRIBE,
        payload
    );
  };

  static ask: ApiServiceMethodType<
      { name: string; email: string; message: string, captchaToken: string },
      string
      > = (payload, ref, behavior) => {
    if (!isEmail(payload.email)) {
      throw new ApiServiceError(
          'Please provide a valid email',
          `[ApiService] - Ask Question - Bad Input - ${payload.email}`
      );
    }

    if (ApiService.memo[ref]) {
      if (behavior === 'reset') {
        ApiService.memo[ref]!.controller.abort();
      } else if (behavior === 'debounce') {
        throw new ApiServiceError(
            'Request pending. Please try again later',
            `[ApiService] - Ask Question - Debounced - ${ref}`
        );
      }
    }

    return ApiService.query('Ask Question', ref, ApiActions.ASK, payload);
  };
}