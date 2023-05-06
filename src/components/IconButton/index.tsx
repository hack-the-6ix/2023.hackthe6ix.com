import { ComponentWithAs, Typography, TypographyProps } from '@ht6/react-ui';
import { Colors } from '@ht6/react-ui/dist/styles';
import { IconType } from '@react-icons/all-files';
import { ReactNode } from 'react';
import cx from 'classnames';
import * as styles from './IconButton.module.scss';

const transformColor = (color: string) =>
  color.replaceAll(/-.{1}/g, (str) => str.charAt(1).toUpperCase());

export type IconButtonProps = ComponentWithAs<{
  textType?: TypographyProps['textType'];
  activeColor?: Colors;
  label?: ReactNode;
  color?: Colors;
  icon: IconType;
}>;

function IconButton({
  activeColor = 'copy-dark',
  textType = 'paragraph2',
  color = 'primary-700',
  as = 'button',
  icon: Icon,
  className,
  label,
  ...props
}: IconButtonProps) {
  return (
    <Typography
      {...props}
      className={cx(
        styles[transformColor(activeColor)],
        styles.root,
        className
      )}
      textType={textType}
      textColor={color}
      as={as}
    >
      <Icon className={styles.icon} />
      {label && <span className={styles.text}>{label}</span>}
    </Typography>
  );
}

export default IconButton;
