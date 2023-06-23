import { useState } from 'react';
import PageSection from '../../components/PageSection';
import { Input, Button, Typography, InputProps } from '@ht6/react-ui';
import { content, title, text, form, long, btn, input, questionSpan, textArea, button } from './Question.module.scss';
import toast from 'react-hot-toast';
import cx from 'classnames';
import { ApiActions, ApiService, ApiServiceError } from '../../utils';
import Textarea from '../../components/Textarea';

import { AnimationOnScroll } from 'react-animation-on-scroll';

function Question() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: '',
  });

  

  const onSubmit = async () => {
    const id = toast.loading('Loading...');
    try {
      const { response } = ApiService.ask(inputs, 'question--ask', 'reset');
      toast.success(await response, { id });
      setInputs({ name: '', email: '', message: '' });
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
    name: keyof typeof inputs,
    placeholder?: string
  ): InputProps => ({
    noBorder: true,
    placeHolderColor: "primary-50",
    textColor: "shades-0",
    placeholder: placeholder ?? label,
    hideLabel: false,
    label,
    name,
    value: inputs[name],
    onChange: (e) => setInputs({ ...inputs, [name]: e.currentTarget.value }),
    required: true,
    status: undefined,
    opacity: 38,
    opacityOnHover: 50
  });

  return (
    <PageSection className={content} id='question'>
      <div>
        <AnimationOnScroll animateIn="animate__fadeInDown">
        <Typography
          className={title}
          textColor='neutral-50'
          textType='heading2'
          as='h2'
          >
          Still have a <span className={questionSpan}>question?</span>
        </Typography>
        </AnimationOnScroll>
        <Typography
          className={text}
          textColor='neutral-50'
          textType='paragraph1'
          as='p'
        >
          Send your question our way and we'll get back to you!
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
        <Input className={input} {...inputProps('Name', 'name', 'Enter name')} />
        <Input className={input} {...inputProps('Email', 'email', 'Enter email')} type='email' />
        <Textarea
          {...(inputProps('Enter your question', 'message') as any)}
          onChange={(e) => {
            setInputs({
              ...inputs,
              [e.currentTarget.name]: e.currentTarget.value.slice(0, 200),
            });
          }}
          placeholder='Send us your questions here!'
          className={cx(long, textArea)}
          limit={200}
          rows={3}
        />
        <div className={cx(long, btn)}>
          <Button className={button} disabled={isSubmitting} type='submit'>
            Send
          </Button>
        </div>
      </form>
    </PageSection>
  );
}

export default Question;
