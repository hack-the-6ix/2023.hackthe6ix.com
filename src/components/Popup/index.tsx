import {
  ComponentWithAs,
  Typography,
  useClickOutside,
  useMountedTransitions,
} from '@ht6/react-ui';
import { RiCloseLine } from '@react-icons/all-files/ri/RiCloseLine';
import { Speeds } from '@ht6/react-ui/dist/styles';
import { createPortal } from 'react-dom';
import { useRef } from 'react';
import cx from 'classnames';
import {
  animated,
  backdrop,
  floating,
  box,
  heading,
  title,
  withText,
  text,
  close,
  closeIcon,
  body,
  scrollBody,
} from './Popup.module.scss';

export type PopupProps = ComponentWithAs<{
  containerClassName?: string;
  description?: string;
  onClose?: () => void;
  target?: HTMLElement;
  className?: string;
  show?: boolean;
  label?: string;
}>;

function Popup({
  target = typeof document !== 'undefined' ? document.body : (null as any),
  as: Component = 'div',
  containerClassName,
  onClose = () => {},
  show = false,
  description,
  className,
  label,
  ...props
}: PopupProps) {
  const { mounted, shown } = useMountedTransitions(show, Speeds.SLOW);
  const boxRef = useRef<HTMLDivElement>(null);
  useClickOutside(boxRef as any, onClose, !shown);
  if (!target) return null;

  return createPortal(
    mounted && (
      <div className={cx(shown && animated, backdrop)}>
        <div ref={boxRef} className={box}>
          <div className={cx(heading, !label && floating)}>
            <div>
              {label && (
                <Typography
                  className={cx(title, description && withText)}
                  textType='subheading'
                  textColor='primary-700'
                  as='h2'
                >
                  {label}
                </Typography>
              )}
              {description && (
                <Typography
                  className={text}
                  textType='paragraph3'
                  textColor='grey'
                  as='p'
                >
                  {description}
                </Typography>
              )}
            </div>
            <button onClick={onClose} className={close}>
              <RiCloseLine className={closeIcon} />
            </button>
          </div>
          <div className={body}>
            <Component {...props} className={cx(scrollBody, className)} />
          </div>
        </div>
      </div>
    ),
    target
  );
}

export default Popup;
