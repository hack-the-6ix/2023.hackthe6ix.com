import { Typography } from '@ht6/react-ui';
import cx from 'classnames';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ElementType, useCallback, useEffect, useRef, useState } from 'react';
import LeftArrow from '../../../images/why-section/icons/left-arrow.webp';
import RightArrow from '../../../images/why-section/icons/right-arrow.webp';
import {
  content,
  control,
  current,
  imgwrapper,
  item,
  items,
  label,
  leftArrow,
  mobilecontroller,
  rightArrow,
  root,
  title,
  wrapper,
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
  const slideRefs = useRef<HTMLLIElement[]>([]);
  const alreadyObserving = useRef<Set<number>>(new Set());
  const mobileControllerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [currentDot, setCurrentDot] = useState(0);
  const onLoad = useRef(true);
  const [rightDisabled, setRightDisabled] = useState<boolean>(false);

  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  const refHook = useCallback((node: HTMLLIElement | null) => {
    if(node) {
      const slideId = node.getAttribute('data-slide-key');
      if(slideId) {
        const slideIdNum = parseInt(slideId);

        slideRefs.current[slideIdNum] = node;
        intersectionObserver.current?.observe(node);
        alreadyObserving.current.add(slideIdNum);
      }
    }
  }, []);

  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver((entries, observer) => {
      const inViewEntries = entries.filter((entry) => entry.isIntersecting);
      if(inViewEntries.length > 0) {
        const slideId = inViewEntries[inViewEntries.length - 1].target.getAttribute('data-slide-key');
        if(slideId) {
          setCurrentDot(parseInt(slideId));
        }
      }
    }, {
      rootMargin: "0px",
      threshold: 0.9,
    })

    for(const eleRef of slideRefs.current) {
      const slideId = eleRef.getAttribute('data-slide-key');
      if(slideId) {
        const slideIdNum = parseInt(slideId);
        if(alreadyObserving.current.has(slideIdNum)){
          intersectionObserver.current?.observe(eleRef);
        }
      }
    }
  }, []);

  const scrollTo = useCallback((idx: number, smooth = false) => {
    if (!scrollRef.current || !slideRefs.current[idx]) return;
    const slideLeft = slideRefs.current[idx]!.offsetLeft;
    // console.log(slideRefs.current)
    
    scrollRef.current.scrollTo({
      behavior: smooth ? 'smooth' : 'auto',
      left: slideLeft - 58 - (window.innerWidth * 0.05), // div padding + image width + image padding
    });
  }, []);

  useEffect(() => {

    const handler = () => {
      if (!slideRefs.current[active]) return;
      scrollTo(active);
    };

    if (window.innerWidth > 1024) {
      setRightDisabled(active === slides.length - 3)
    } else if (768 <= window.innerWidth && window.innerWidth <= 1024) {
      setRightDisabled(active === slides.length - 2)
    } else if (window.innerWidth <= 768) {
      setRightDisabled(active === slides.length - 1)
    }

    for (let i = 0; i < mobileControllerRefs.current.length; i++) {
      mobileControllerRefs.current[i]!.classList.remove(current);
      mobileControllerRefs.current[active]!.classList.add(current);
    }

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
    <div className={root} id='slides'>
      <button
        className={cx(control, leftArrow)}
        onClick={() => setActive(active - 1)}
        disabled={active === 0}
        id='left'
      >
        <img src={LeftArrow} alt='leftarrow' />
      </button>
      <ul ref={scrollRef} className={items}>
        {slides.map((slide, key) => (
          <li
            ref={refHook}
            className={item}
            key={"slide" + key}
            data-slide-key={key}
          >
            <div className={imgwrapper}>
              <GatsbyImage
                image={slide.image!}
                alt={`Headshot of ${item.name}`}
              />
            </div>
            <div className={wrapper}>
              <Typography
                className={title}
                textType='heading3'
                textColor='primary-1'
                as={headingLevel}
              >
                {slide.title}
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
                <Typography textType='p' textWeight='600' textColor='primary-3' as='span'>
                  {slide.name},{' '}
                </Typography>
                <Typography textType='p' textColor='primary-3' as='span'>
                  {slide.role}
                </Typography>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={cx(control, rightArrow)}
        onClick={() => setActive(active + 1)}
        disabled={rightDisabled}
        id='right'
      >
        <img src={RightArrow} alt='rightarrow' />
      </button>
      <div className={mobilecontroller}>
        {
          slides.map((slide, key) => (
            <div className={cx((key === currentDot) ? current : "")}
                 ref={(el) => (mobileControllerRefs.current[key] = el)}
                 key={"dot"+key}
            ></div>
          ))
        }
      </div>
    </div>
  );
}

export default Slides;
