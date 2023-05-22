import { Colors } from '@ht6/react-ui/dist/styles';
import { PropsWithChildren } from 'react';
import cx from 'classnames';
import { colorClassName } from '../../utils';
import * as styles from './Highlight.module.scss';
export interface HighlightProps {
  highlightColor: Colors;
}

export default function Highlight({
  highlightColor,
  children,
}: PropsWithChildren<HighlightProps>) {
  return (
    <span
      className={cx(
        styles[colorClassName(highlightColor, 'highlight')],
        styles.highlight
      )}
    >
      {children}
    </span>
  );
}
