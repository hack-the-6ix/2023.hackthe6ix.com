import { FaArrowUp } from '@react-icons/all-files/fa/FaArrowUp';
import { StaticImage } from 'gatsby-plugin-image';
import { useEffect, useState } from 'react';
import {BasicLink, BasicLinkProps, Input, Link, Typography} from '@ht6/react-ui';
import cx from 'classnames';
import PageSection from '../PageSection';
import IconButton from '../IconButton';
import {
  root,
  row,
  text,
  linkItem,
  link,
  items,
  floatingBtn,
  hide,
  img,
  ht6,
  footerbg
} from './Footer.module.scss';
import Bg from '../../images/Footer-Bg.svg';
import Socials from '../Socials';

const links: Omit<BasicLinkProps, 'linkType'>[] = [
  {
    children: 'Privacy Policy',
    href: 'http://cdn.hackthe6ix.com/privacy-policy.pdf',
  },
  {
    children: 'MLH Code of Conduct',
    href: 'https://static.mlh.io/docs/mlh-code-of-conduct.pdf',
  },
  {
    children: 'Covid-19 Safety',
    href: '#', // where is this supposed to go
  },
];

function Footer() {
  const [hideButton, setHideButton] = useState(true);
  useEffect(() => {
    const handler = () => setHideButton(window.scrollY <= 100);
    window.addEventListener('scroll', handler, true);
    return () => {
      window.removeEventListener('scroll', handler, true);
    };
  }, []);
  return (
    <>
      {/* <Bg className={footerbg}/> */}
      <IconButton
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          history.replaceState({}, '', '#');
        }}
        className={cx(hideButton && hide, floatingBtn)}
        label='Back to Top'
        icon={FaArrowUp}
      />
      <PageSection
        append={
          <StaticImage
            alt='fictional artwork of toronto skyline'
            src='../../images/footer.png'
            layout='fullWidth'
            className={img}
            quality={100}
          />
        }
        containerClassName={root}
        as='footer'
      >
        <div className={row}>
          <Typography
            className={ht6}
            textColor='primary-200'
            textType='heading2'
            as='p'
          >
            Hack the 6ix
          </Typography>
          <Typography className={items} textType='subheading' as='ul'>
            {links.map((linkProps, key) => (
              <li className={linkItem} key={key}>
                <BasicLink
                  {...linkProps}
                  rel='noopener noreferrer'
                  className={link}
                  linkColor='warning-400'
                  linkStyle='styled'
                  target='_blank'
                  href={linkProps.href}
                />
              </li>
            ))}
          </Typography>
        </div>
        <div className={row}>
          <Typography
            className={text}
            textColor='copy-light'
            textType='paragraph1'
          >
            © Copyright 2023 Hack the 6ix | Made with ♡ in Toronto
          </Typography>
          <Socials baseColor='copy-light' activeColor='warning-400' gap='2rem' />
        </div>
      </PageSection>
    </>
  );
}

export default Footer;
