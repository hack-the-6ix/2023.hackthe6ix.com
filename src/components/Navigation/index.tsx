import { RiMenuLine } from '@react-icons/all-files/ri/RiMenuLine';
import { useCallback, useEffect, useRef, useState, MouseEvent } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Button, Typography } from '@ht6/react-ui';
import cx from 'classnames';
import Link, { LinkProps } from '../Link';
import PageSection from '../PageSection';
import Popup from '../Popup';
import Logo from '../../images/logo.svg';
import {
  root,
  content,
  logo,
  logoSvg,
  linkItems,
  linkItem,
  linkItemActive,
  menu,
  menuIcon,
  mobileNav,
  mobileNavItem,
  mobileNavItemActive,
  banner,
  apply,
  applyContainer,
  applyMobile,
} from './Navigation.module.scss';

function setHash(event: MouseEvent, path: string, scroll?: boolean) {
  event.preventDefault();
  history.replaceState({}, '', path);
  if (scroll) {
    let top = 0;
    try {
      top = document.querySelector<HTMLElement>(path)?.offsetTop ?? 0;
    } catch {}
    const offset = window.innerHeight * 0.2;
    window.scrollTo({ top: top - offset, behavior: 'smooth' });
  }
}

export interface NavigationProps {
  showMlhBanner?: boolean;
  useScrollSpy?: boolean;
  links: LinkProps[];
  base?: string;
}

function Navigation({
  showMlhBanner,
  useScrollSpy,
  base = '/',
  links,
}: NavigationProps) {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);

  const getItemTops = useCallback(() => {
    if (!useScrollSpy) return [];
    return links.map(
      (link) => document.querySelector<HTMLElement>(link.to)?.offsetTop ?? -999
    );
  }, [links, useScrollSpy]);

  const itemTops = useRef<number[]>([]);
  useEffect(() => {
    if (!useScrollSpy) return;

    const scrollHandler = () =>
      setTop(window.scrollY + window.innerHeight * 0.8);
    window.addEventListener('scroll', scrollHandler, true);

    const resizeHandler = () => {
      itemTops.current = getItemTops();
      setTop(window.scrollY);
    };
    window.addEventListener('resize', resizeHandler, true);
    resizeHandler();

    return () => {
      window.removeEventListener('scroll', scrollHandler, true);
      window.removeEventListener('resize', resizeHandler, true);
    };
  }, [useScrollSpy, getItemTops]);

  const activeIdx = itemTops.current.reduce<number>((acc, item, idx) => {
    if ((item ?? -999) <= top) {
      acc = idx;
    }
    return acc;
  }, -1);

  return (
    <PageSection containerClassName={root} className={content} as='nav'>
      <Link
        onClick={(...args) => setHash(...args, '#', true)}
        className={logo}
        to={base}
        linkType='gatsby'
        linkStyle='pure'
      >
        <Logo className={logoSvg} />
        <Typography textType='heading3' textColor='primary-1'>
          Hack the 6ix
        </Typography>
      </Link>
      {links && (
        <ul className={linkItems}>
          {links.map((link, key) => {
            return (
              <Typography
                key={key}
                textType='paragraph2'
                textWeight={650}
                textColor='grey'
                as='li'
              >
                <Link
                  {...link}
                  onClick={(...args) => {
                    setHash(...args, link.to, true);
                    link.onClick?.(...args);
                  }}
                  linkStyle='pure'
                  className={cx(key === activeIdx && linkItemActive, linkItem)}
                />
              </Typography>
            );
          })}
        </ul>
      )}
      <button onClick={() => setShow(true)} className={menu}>
        <RiMenuLine className={menuIcon} />
      </button>
      <Popup
        onClose={() => setShow(false)}
        label='Navigate to Section'
        className={mobileNav}
        show={show}
        as='ul'
      >
        {links.map((link, key) => {
          return (
            <Typography
              key={key}
              textType='paragraph2'
              textWeight={650}
              textColor='grey'
              as='li'
            >
              <Link
                {...link}
                linkStyle='pure'
                onClick={(...args) => {
                  setHash(...args, link.to, true);
                  link.onClick?.(...args);
                  setShow(false);
                }}
                className={cx(
                  key === activeIdx && mobileNavItemActive,
                  mobileNavItem
                )}
              />
            </Typography>
          );
        })}
      </Popup>
      {showMlhBanner && (
        <Link
          to='https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2023-season&utm_content=yellow'
          rel='noreferrer noopener'
          className={banner}
          linkType='anchor'
          linkStyle='pure'
          target='_blank'
        >
          <StaticImage
            alt='MLH 2023 Season Banner'
            src='../../images/mlh.png'
            placeholder='none'
            quality={100}
            width={200}
          />
        </Link>
      )}
    </PageSection>
  );
}

export default Navigation;
