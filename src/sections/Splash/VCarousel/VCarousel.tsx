import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { root, item, active } from './VCarousel.module.scss';

export interface VCarouselProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  items: ReactNode[];
  pause?: boolean;
  duration?: number;
}

function VCarousel({
  items,
  pause = false,
  duration = 3000,
  ...props
}: VCarouselProps) {
  if (process.env.NODE_ENV === 'development') {
    if (items.length <= 1) {
      console.warn('Carousel has only one item. Are you sure you need this?');
    }
  }

  const [dim, setDim] = useState({ w: -1, h: -1 });
  const [current, setCurrent] = useState(0);

  const rootRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const onLoad = useRef<boolean>(true);

  const setCurrentDim = useCallback(
    (animate?: boolean) => {
      if (!rootRef.current) return;
      const { offsetWidth, offsetHeight, offsetTop } =
        itemsRef.current[current];
      setDim({ w: offsetWidth, h: offsetHeight });
      rootRef.current.scrollTo({
        top: offsetTop - rootRef.current.offsetTop,
        behavior: animate ? 'smooth' : 'auto',
      });
    },
    [current]
  );

  useEffect(
    () => () => {
      onLoad.current = true;
    },
    []
  );

  useEffect(() => {
    const handler = () => setCurrentDim();
    window.addEventListener('resize', handler, true);
    return () => {
      window.removeEventListener('resize', handler, true);
    };
  }, [setCurrentDim]);

  useEffect(() => {
    // Skip if manually set to freeze
    if (pause || !rootRef.current) return;

    // Set up parent sizing
    setCurrentDim(!!current);

    // Set up skipping for resetting transition
    if (!onLoad.current && !current) return setCurrent(1);
    onLoad.current = false;

    // Setup duration for showing text
    const timer = window.setTimeout(() => {
      const nextIdx = (current + 1) % (items.length + 1);
      setCurrent(nextIdx);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [current, setCurrentDim, duration, pause, items.length]);

  return (
    <ul
      {...props}
      style={
        {
          '--vc-w': dim.w < 0 ? undefined : dim.w + 'px',
          '--vc-h': dim.h < 0 ? undefined : dim.h + 'px',
        } as CSSProperties
      }
      ref={rootRef}
      className={cx(root, props.className)}
    >
      {items.map((word, key) => (
        <li
          className={cx(item, key === current && active)}
          ref={(el) => (itemsRef.current[key] = el!)}
          key={key}
        >
          {word}
        </li>
      ))}
      {/* For transition, shouldn't be picked up by a screenreader */}
      <li
        className={cx(item, current === items.length && active)}
        ref={(el) => (itemsRef.current[items.length] = el!)}
        aria-hidden
      >
        {items[0]}
      </li>
    </ul>
  );
}

export default VCarousel;
