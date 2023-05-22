import { ComponentWithAs, Typography, TypographyProps } from '@ht6/react-ui';
import { Fragment, ReactNode, useState } from 'react';
import cx from 'classnames';
import {
  root,
  header,
  list,
  trigger,
  label,
  icon,
  iconLineH,
  iconLineV,
  content,
  text,
  closed,
  line,
} from './AccordionGroup.module.scss';

export type AccordionGroupProps = ComponentWithAs<{
  headingProps?: Omit<TypographyProps, 'textType' | 'textColor'>;
  heading: ReactNode;
  multiple?: boolean;
  items: {
    content: ReactNode;
    label: ReactNode;
  }[];
}>;

function AccordionGroup({
  as: Component = 'div',
  headingProps = {},
  multiple,
  heading,
  items,
  ...props
}: AccordionGroupProps) {
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const toggle = (idx: number) => {
    const _isOpen = isOpen ? [...isOpen] : [];
    _isOpen[idx] = !_isOpen[idx];
    setIsOpen(_isOpen);
  };

  return (
    <Component {...props} className={cx(root, props.className)}>
      <Typography
        {...headingProps}
        className={cx(header, headingProps.className)}
        textColor='primary-3'
        textType='heading3'
      >
        {heading}
      </Typography>
      <dl className={list}>
        {items.map((item, key) => {
          const isOpened = isOpen[key];
          return (
            <Fragment key={key}>
              <dt>
                <Typography
                  onClick={() => toggle(key)}
                  textColor='copy-dark'
                  className={trigger}
                  textType='heading4'
                  as='button'
                >
                  <span className={label}>{item.label}</span>
                  <div className={cx(icon, !isOpened && closed)}>
                    <div className={iconLineH} />
                    <div className={iconLineV} />
                  </div>
                </Typography>
              </dt>
              <Typography
                textColor='copy-dark'
                textType='paragraph1'
                className={content}
                as='dd'
              >
                <p className={cx(text, !isOpened && closed)}>{item.content}</p>
                {key + 1 !== items.length && <hr className={line} />}
              </Typography>
            </Fragment>
          );
        })}
      </dl>
    </Component>
  );
}

export default AccordionGroup;
