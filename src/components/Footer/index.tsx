import { FaArrowUp } from '@react-icons/all-files/fa/FaArrowUp';
import { StaticImage } from 'gatsby-plugin-image';
import { useEffect, useState } from 'react';
import { Typography } from '@ht6/react-ui';
import cx from 'classnames';
import Link, { LinkProps } from '../Link';
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
} from './Footer.module.scss';
import Socials from '../Socials';

const links: Omit<LinkProps, 'linkType'>[] = [
  {
    children: 'Privacy Policy',
    to: 'http://cdn.hackthe6ix.com/privacy-policy.pdf',
  },
  {
    children: 'MLH Code of Conduct',
    to: 'https://static.mlh.io/docs/mlh-code-of-conduct.pdf',
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
            className={text}
            textColor='primary-1'
            textType='heading2'
            as='p'
          >
            Hack the 6ix
          </Typography>
          <Socials baseColor='copy-light' activeColor='primary-4' gap='2rem' />
        </div>
        <div className={row}>
          <Typography
            className={text}
            textColor='copy-light'
            textType='paragraph1'
          >
            © Copyright 2023 <strong>Hack the 6ix</strong> | Made with ♡ in
            Toronto
          </Typography>
          <Typography className={items} textType='subheading' as='ul'>
            {links.map((linkProps, key) => (
              <li className={linkItem} key={key}>
                <Link
                  {...linkProps}
                  rel='noopener noreferrer'
                  className={link}
                  linkColor='primary-4'
                  linkStyle='styled'
                  linkType='anchor'
                  target='_blank'
                />
              </li>
            ))}
          </Typography>
        </div>
      </PageSection>
    </>
  );
}

export default Footer;
