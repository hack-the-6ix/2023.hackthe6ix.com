import {Typography} from '@ht6/react-ui';
import {StaticImage} from 'gatsby-plugin-image';
import {useState} from 'react';
import Highlight from '../../components/Highlight';
import PageSection from '../../components/PageSection';
import Link from '../../components/Link';
import {container, headline, image, root, text, input, title} from './Notify.module.scss';
import InputButton from "../../components/InputButton";
import {ApiActions, ApiService, ApiServiceError} from "../../utils";
import toast from "react-hot-toast";
import TurnstileChallenge from "../../components/TurnstileChallenge";

function Notify() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  // @ts-ignore
    return (
    <PageSection className={root} containerClassName={container} id='notify'>
      <StaticImage
        src='../../images/laptop.png'
        alt='laptop'
        quality={100}
        className={image}
      />
      <div className={headline}>
        <Typography
          className={text}
          textColor='primary-3'
          textType='heading2'
          as='h2'
        >
          Applications will&nbsp;
           <Highlight highlightColor='primary-4'>open soon.</Highlight>
        </Typography>
        <Typography
          className={text}
          textColor='primary-3'
          textType='heading4'
          as='p'
        >
            Keep me posted about the latest application updates!
        </Typography>
      </div>
        <InputButton
            action={ApiService.getAction(ApiActions.SUBSCRIBE)}
            method='POST'
            className={input}
            onSubmit={async () => {
                const id = toast.loading('Loading...');
                try {
                    const { response } = ApiService.subscribe(
                        { email, captchaToken: token },
                        'notify-section--notify',
                        'reset'
                    );
                    toast.success(await response, { id });
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
            }}
            inputProps={{
                type: 'email',
                required: true,
                value: email,
                onChange: (e) => setEmail(e.currentTarget.value),
            }}
            buttonText={<span className={title}>Notify Me</span>}
            label='Enter Your Email'
            name='email'
        />
        <TurnstileChallenge onToken={(token) => setToken(token)}/>
      <Typography
        className={text}
        textColor='primary-3'
        textType='paragraph1'
        as='p'
      >
        Got questions? Check out our{' '}
        <Link linkType='anchor' linkStyle='styled' to='#faq'>
          FAQ
        </Link>{' '}
        section!
      </Typography>
    </PageSection>
  );
}

export default Notify;
