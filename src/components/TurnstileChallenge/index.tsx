import * as React from 'react';

import { useTurnstileReady } from 'gatsby-plugin-turnstile/src';
import { useTurnstileSiteKey } from 'gatsby-plugin-turnstile/src';
import {useEffect, useRef, useState} from "react";

type Props = {
    siteKey?: string,
    onToken?: (token: string) => unknown
};

export default function TurnstileChallenge({
       siteKey: overrideSiteKey,
       onToken
   }: Props) {
    const pluginSiteKey = useTurnstileSiteKey();
    const siteKey = overrideSiteKey || pluginSiteKey;
    const turnstileReady = useTurnstileReady();

    const [token, setToken] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!(ref.current && turnstileReady)) {
            return;
        }
        const widgetId = window.turnstile.render(ref.current, {
            siteKey,
            callback: setToken,
        });
        return () => {
            if (widgetId) {
                window.turnstile.remove(widgetId);
            }
        };
    }, [siteKey, turnstileReady]);

    useEffect(() => {token && onToken?.(token)}, [token]);

    return (
        <>
            {turnstileReady && (
                <div ref={ref} className="cf-turnstile" data-sitekey={siteKey} />
            )}
            {token && (
                <input type="hidden" name="cf-turnstile-response" value={token} />
            )}
            <noscript>
                <div className="cf-turnstile" data-sitekey={siteKey} />
            </noscript>
        </>
    );
}