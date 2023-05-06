import { InputLayout, InputLayoutProps, Typography } from '@ht6/react-ui';
import { Colors } from '@ht6/react-ui/dist/styles';
import { ChangeEvent, HTMLAttributes } from 'react';
import cx from 'classnames';
import * as styles from './Textarea.module.scss';
import { colorClassName } from '../../utils';

export interface TextareaProps
  extends HTMLAttributes<HTMLTextAreaElement>,
    Omit<InputLayoutProps, 'children'> {
  outlineColor?: Colors;
  limit?: number;
  value?: string;
}

function Textarea({
  hideLabel,
  label,
  status,
  className,
  outlineColor,
  limit,
  ...props
}: TextareaProps) {
  const count = props.value?.length ?? 0;
  const atLimit = limit ? count >= limit : false;

  return (
    <InputLayout
      required={props.required}
      hideLabel={hideLabel}
      className={className}
      name={props.name}
      status={status}
      label={label}
    >
      <Typography
        {...props}
        className={cx(
          outlineColor && styles[colorClassName(outlineColor, 'outline')],
          styles.field
        )}
        textType='paragraph2'
        as='textarea'
      />
      {!status && limit && (
        <Typography
          textColor={atLimit ? 'error' : 'disabled-dark'}
          className={styles.text}
          textType='paragraph3'
        >
          {count} / {limit}
        </Typography>
      )}
    </InputLayout>
  );
}

export default Textarea;
