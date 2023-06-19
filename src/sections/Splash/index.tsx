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
import toast from 'react-hot-toast';
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
  hideDesktop,
  featureObject,
  splashContent,
} from './Splash.module.scss';
import { ApiService, ApiServiceError } from '../../utils';

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
  // const [emailInput, setEmailInput] = useState({email: ''});
  // const [submitting, setSubmitting] = useState(false);

  const startFormat = new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
  });
  const endFormat = new Intl.DateTimeFormat('en-CA', {
    month: isSameMonth ? undefined : 'long',
    day: 'numeric',
  });

  // Email Submission
  // const onSubmit = async () => {
  //   const id = toast.loading('Loading...');
  //   try {
  //     const { response } = ApiService.subscribe(emailInput, 'subscribe', 'reset');
  //     toast.success(await response, {id});
  //     setEmailInput({email: ''});
  //   } catch (err) {
  //     switch ((err as any).name) {
  //       case 'AbbortError':
  //         break;
  //       case 'ApiServiceError':
  //         toast.error((err as ApiServiceError).getHumanError(), { id });
  //         console.error(err);
  //         break;
  //       default:
  //         toast.error('Unexpected error. Please try again later', { id });
  //         console.error(err);
  //         break;
  //     }
  //   }
    
  //   // To validate provided email address
  //   if (!/\S+@\S+\.\S+/.test(emailInput.email)) {
  //     toast.error("Please enter a valid email address");
  //     return;
  //   };
  // };

  return (
    <PageSection
      containerClassName={container}
      className={splashContent}
    >
        <Typography
          className={cx(text, dates)}
          textColor='neutral-50'
          textType='heading3'
          as='p'
        >
          {startFormat.format(startDate)} - {endFormat.format(endDate)}, 2023
          <span className={hideMobile}> • </span> 
          <span className={eventType}> In-person event</span>
        </Typography>
        <Typography
          className={cx(text, title)}
          textColor='neutral-50'
          textType='heading1'
          as='h1'
        >
          Hack the 6ix is Toronto's <br className={hideMobile} /> <span className={textHighlight}>largest</span> summer hackathon, <br className={hideMobile} /> where <span className={textHighlight}>anyone</span> can hack <br className={hideDesktop} /> to <br className={hideMobile} />
          <VCarousel className={carousel} items={words} />
        </Typography>
        <Typography
          className={cx(text, signUpText)}
          textColor='neutral-50'
          textType='paragraph1'
          as='paragraph'
        >
          Applications opening soon! Receive the latest updates in your inbox.
        </Typography>
        <InputButton
          label='Enter email'
          name='Enter email'
          buttonText='Notify me'
          inputProps={{
            noBorder: true,
            opacity: 38,
            opacityOnHover: 50,
            placeHolderColor: "primary-50",
            textColor: "shades-0",
          }}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   setSubmitting(true);
          //   onSubmit();
          //   return false;
          // }}
          // onChange={(e) => {
          //   setEmailInput({
          //     ...inputProps,
          //     [e.currentTarget.name]: e.currentTarget.value.slice(0, 200),
          //   });
          // }}
        >
          <Button
            type='submit'
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


      {/* From 2022:
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
      /> */}
    </PageSection>
  );
}

export default Splash;
