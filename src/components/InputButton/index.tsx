import { Input, Button, InputLayoutProps, Typography } from '@ht6/react-ui';
import {
  FormHTMLAttributes,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import cx from 'classnames';
import { container, content, field, button } from './InputButton.module.scss';

export interface InputButtonProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: InputLayoutProps['className'];
  label: InputLayoutProps['label'];
  name: InputLayoutProps['name'];
  status?: InputLayoutProps['status'];
  inputProps?: InputHTMLAttributes<HTMLInputElement> & {};
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonText: ReactNode;
}

function InputButton({
  className,
  label,
  name,
  status,
  inputProps,
  buttonProps,
  buttonText,
  ...props
}: InputButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <form
      {...props}
      className={cx(container, className)}
      onSubmit={(event) => {
        setIsDisabled(true);
        event.preventDefault();
        (async () => {
          await props.onSubmit?.(event);
          setIsDisabled(false);
        })();
        return false;
      }}
    >
      <div className={content}>
        <Input
          {...inputProps}
          status={status ? { state: status.state } : undefined}
          outlineColor='primary-1'
          disabled={isDisabled}
          className={field}
          label={label}
          name={name}
          hideLabel
        />
        <Button
          {...buttonProps}
          buttonColor={status?.state}
          disabled={isDisabled}
          className={button}
        >
          {buttonText}
        </Button>
      </div>
      {status?.text && (
        <Typography textType='paragraph3' color={status}>
          {status?.text}
        </Typography>
      )}
    </form>
  );
}

export default InputButton;
