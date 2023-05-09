import { Button, Typography } from '@ht6/react-ui';
import { graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useState } from 'react';
import { FaArrowDown } from '@react-icons/all-files/fa/FaArrowDown';
import cx from 'classnames';
import PageSection from '../../components/PageSection';
import Highlight from '../../components/Highlight';
import Socials from '../../components/Socials';
import IconButton from '../../components/IconButton';
import VCarousel from './VCarousel/VCarousel';
import Link from '../../components/Link';
import {
  container,
  content,
  backdrop,
  carousel,
  text,
  title,
  banner,
  aside,
  socials,
  apply,
  applyContainer,
} from './Splash.module.scss';

const query = graphql`
  query SplashQuery {
    allSite {
      nodes {
        siteMetadata {
          event {
            start
            end
          }
          socials {
            link
            type
          }
        }
      }
    }
  }
`;

const words = ['network.', 'learn.', 'win.', 'create a project.', 'collaborate.'];

function Splash() {
  const data = useStaticQuery<GatsbyTypes.SplashQueryQuery>(query);
  const startDate = new Date(data.allSite.nodes[0].siteMetadata!.event!.start!);
  const endDate = new Date(data.allSite.nodes[0].siteMetadata!.event!.end!);
  const isSameMonth = startDate.getMonth() === endDate.getMonth();
  const [email, setEmail] = useState('');

  const startFormat = new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
  });
  const endFormat = new Intl.DateTimeFormat('en-CA', {
    month: isSameMonth ? undefined : 'long',
    day: 'numeric',
  });

  return (
    <PageSection
      containerClassName={container}
      className={content}
      append={
        <StaticImage
          alt='Ficitional toronto landscape with CN tower'
          src='../../images/landing.png'
          className={backdrop}
          layout='fullWidth'
          objectFit='cover'
          quality={100}
        />
      }
    >
      <Typography
        className={text}
        textColor='copy-dark'
        textType='heading3'
        as='p'
      >
        <Highlight highlightColor='warning-400'>
          {startFormat.format(startDate)} - {endFormat.format(endDate)} | Hybrid
          Event
        </Highlight>
      </Typography>
      <Typography
        className={cx(text, title)}
        textColor='primary-700'
        textType='heading1'
        as='h1'
      >
        Hack the 6ix is Toronto's <span className={highlight}>largest</span> summer hackathon, where <span className={highlight}>anyone</span> can hack to
      </Typography>
      <Typography
        className={banner}
        textColor='copy-dark'
        // change to same heading/font-size as above
        textType='heading2'
        as='div'
      >
        {/* <p className={text}>We hack to</p> */}
        <VCarousel className={carousel} items={words} />
      </Typography>
      {/* Email Sign up */}
      <Socials
        className={socials}
        baseColor='primary-700'
        activeColor='warning-400'
        gap='1rem'
      />
      <IconButton
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          history.replaceState({}, '', '#about');
          let top = 0;
          try {
            top = document.querySelector<HTMLElement>('#about')?.offsetTop ?? 0;
          } catch {}
          const offset = window.innerHeight * 0.2;
          window.scrollTo({ top: top - offset, behavior: 'smooth' });
        }}
        icon={FaArrowDown}
        label='Learn More'
        href='#about'
        as='a'
      />
    </PageSection>
  );
}

export default Splash;
