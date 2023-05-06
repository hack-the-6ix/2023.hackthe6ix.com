  import { ComponentWithAs } from '@ht6/react-ui';
import { ReactNode } from 'react';
import cx from 'classnames';
import { container, content } from './PageSection.module.scss';

export type PageSectionProps = ComponentWithAs<{
  containerClassName?: string;
  children?: ReactNode;
  className?: string;
  append?: ReactNode;
}>;

function PageSection({
  as: Component = 'section',
  containerClassName,
  className,
  children,
  append,
  ...props
}: PageSectionProps) {
  return (
    <Component className={cx(container, containerClassName)} {...props}>
      <div className={cx(content, className)}>{children}</div>
      {append}
    </Component>
  );
}

export default PageSection;
