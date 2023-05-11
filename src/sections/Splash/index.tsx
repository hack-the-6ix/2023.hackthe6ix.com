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
import InputButton from '../../components/InputButton';
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
  textHighlight,
  dates,
  eventType,
  hideMobile,
  signUpText,
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
      // TODO: Add website full bg later
      // append={
      //   <StaticImage
      //     alt='Ficitional toronto landscape with CN tower and sailor ship sailing a sea of clouds'
      //     src='../../images/Hero-Bg.svg'
      //     className={backdrop}
      //     layout='fullWidth'
      //     objectFit='cover'
      //     quality={100}
      //   />
      // }
    >
      <Typography
        className={cx(text, dates)}
        textColor='shades-0'
        textType='heading3'
        as='p'
      >
        {startFormat.format(startDate)} - {endFormat.format(endDate)} 
        <span className={eventType}> • In-person event</span>
      </Typography>
      <Typography
        className={cx(text, title)}
        textColor='shades-0'
        textType='heading1'
        as='h1'
      >
        Hack the 6ix is Toronto's <br className={hideMobile} /> <span className={textHighlight}>largest</span> summer hackathon, <br className={hideMobile} /> where <span className={textHighlight}>anyone</span> can hack to<br className={hideMobile} />
        <VCarousel className={carousel} items={words} />
      </Typography>
      <Typography
        className={cx(text, signUpText)}
        textColor='shades-0'
        textType='paragraph1'
        as='paragraph'
      >
        Applications opening soon! Receive the latest updates in your inbox.
      </Typography>
      {/* Email Sign up */}
      <InputButton
        label='Enter email'
        name='Enter email'
        buttonText='Notify me'
      >
        {/* label, name, buttonText */}
        <Button
          buttonColor='primary-500'
          // TODO: Trigger callback with email as parameter (to be implemented later)
          // href='https://dash.hackthe6ix.com'
          // rel='noreferrer noopener'
        >
          Notify me
        </Button>
      </InputButton>
      <Socials
        className={socials}
        baseColor='shades-0'
        activeColor='primary-500' 
        gap='1rem'
      />
      {/* <IconButton
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
      /> */}
    </PageSection>
  );
}

export default Splash;
