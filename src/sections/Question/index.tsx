import { useState } from 'react';
import PageSection from '../../components/PageSection';
import { Input, Button, Typography, InputProps } from '@ht6/react-ui';
import { content, title, text, form, long, btn } from './Question.module.scss';
import toast from 'react-hot-toast';
import cx from 'classnames';
import { ApiActions, ApiService, ApiServiceError } from '../../utils';
import Textarea from '../../components/Textarea';
import TurnstileChallenge from "../../components/TurnstileChallenge";

function Question() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: '',
    captchaToken: ''
  });

  const onSubmit = async () => {
    const id = toast.loading('Loading...');
    try {
      if(!inputs.captchaToken) {
        toast.error("Please complete the captcha.", {id});
        return;
      }

      const { response } = ApiService.ask(inputs, 'question--ask', 'reset');
      toast.success(await response, { id });
      setInputs({ name: '', email: '', message: '', captchaToken: inputs.captchaToken });
    } catch (err) {
      switch ((err as any).name) {
        case 'AbortError':
          // Dont worry about it
          break;
        case 'ApiServiceError':
          toast.error((err as ApiServiceError).getHumanError(), { id });
          console.error(err);
          break;
        default:
          toast.error('Unexpected error. Please try again later', { id });
          console.error(err);
          break;
      }
    }
    setIsSubmitting(false);
  };

  const inputProps = (
    label: string,
    name: keyof typeof inputs
  ): InputProps => ({
    outlineColor: 'grey',
    placeholder: label,
    hideLabel: false,
    label,
    name,
    value: inputs[name],
    onChange: (e) => setInputs({ ...inputs, [name]: e.currentTarget.value }),
    required: true,
    status: undefined,
  });

  return (
    <PageSection className={content} id='question'>
      <div>
        <Typography
          className={title}
          textColor='primary-3'
          textType='heading2'
          as='h2'
        >
          Still have a question?
        </Typography>
        <Typography
          className={text}
          textColor='copy-dark'
          textType='paragraph1'
          as='p'
        >
          Send your question our way and we'll get back to you within 48 hours!
        </Typography>
      </div>
      <form
        action={ApiService.getAction(ApiActions.ASK)}
        method='POST'
        className={form}
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          onSubmit();
          return false;
        }}
      >
        <Input {...inputProps('Name', 'name')} />
        <Input {...inputProps('Email', 'email')} type='email' />
        <Textarea
          {...(inputProps('Enter your question here', 'message') as any)}
          onChange={(e) => {
            setInputs({
              ...inputs,
              [e.currentTarget.name]: e.currentTarget.value.slice(0, 200),
            });
          }}
          placeholder='Send us your questions here!'
          className={long}
          limit={200}
          rows={3}
        />
        <TurnstileChallenge onToken={(token) => setInputs({ ...inputs, ["captchaToken"]: token })}/>
        <div className={cx(long, btn)}>
          <Button disabled={isSubmitting} type='submit'>
            SEND
          </Button>
        </div>
      </form>
    </PageSection>
  );
}

export default Question;
