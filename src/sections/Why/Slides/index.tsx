import { ElementType, useCallback, useEffect, useRef, useState } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Typography } from '@ht6/react-ui';
import cx from 'classnames';
import LeftArrow from '../../../images/left-arrow.svg';
import RightArrow from '../../../images/right-arrow.svg';
import {
  root,
  controls,
  control,
  items,
  item,
  image,
  title,
  content,
  label,
  activeItem,
} from './Slides.module.scss';

export interface SlidesProps {
  slides: {
    image?: IGatsbyImageData;
    title: string;
    content: string;
    name: string;
    role: string;
  }[];
  headingLevel: ElementType<any>;
}

function Slides({ slides, headingLevel }: SlidesProps) {
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const onLoad = useRef(true);

  const scrollTo = useCallback((idx: number, smooth = false) => {
    if (!scrollRef.current || !slideRefs.current[idx]) return;
    const slideWidth = slideRefs.current[idx]!.offsetWidth;
    const slideLeft = slideRefs.current[idx]!.offsetLeft;
    const parentWidth = scrollRef.current.offsetWidth;

    scrollRef.current.scrollTo({
      behavior: smooth ? 'smooth' : 'auto',
      left: slideLeft + (slideWidth - parentWidth) / 2,
    });
  }, []);

  useEffect(() => {
    const handler = () => {
      if (!slideRefs.current[active]) return;
      scrollTo(active);
    };

    window.addEventListener('resize', handler, true);
    return () => {
      window.removeEventListener('resize', handler, true);
    };
  }, [active, scrollTo]);

  useEffect(() => {
    if (!slideRefs.current[active]) return;
    scrollTo(active, !onLoad.current);
    onLoad.current = false;
  }, [active, scrollTo]);

  return (
    <div className={root}>
      <div className={controls}>
        <button
          className={control}
          onClick={() => setActive(active - 1)}
          disabled={active === 0}
        >
          <LeftArrow width='22' />
        </button>
        <button
          className={control}
          onClick={() => setActive(active + 1)}
          disabled={active === slides.length - 1}
        >
          <RightArrow width='22' />
        </button>
      </div>
      <ul ref={scrollRef} className={items}>
        <li className={item} />
        {slides.map((slide, key) => (
          <li
            ref={(el) => (slideRefs.current[key] = el)}
            className={cx(item, key === active && activeItem)}
            key={key}
          >
            <GatsbyImage
              imgStyle={{ borderRadius: '100%' }}
              image={slide.image!}
              alt={`Headshot of ${item.name}`}
              className={image}
            />
            <Typography
              className={title}
              textType='heading3'
              textColor='primary-500'
              as={headingLevel}
            >
              “{slide.title}”
            </Typography>
            <Typography
              className={content}
              textType='paragraph2'
              textColor='copy-dark'
              as='p'
            >
              {slide.content}
            </Typography>
            <p className={label}>
              —{' '}
              <Typography textType='heading4' textColor='primary-700' as='span'>
                {slide.name},{' '}
              </Typography>
              <Typography textType='subheading' textColor='primary-700' as='span'>
                {slide.role}
              </Typography>
            </p>
          </li>
        ))}
        <li className={item} />
      </ul>
    </div>
  );
}

export default Slides;
