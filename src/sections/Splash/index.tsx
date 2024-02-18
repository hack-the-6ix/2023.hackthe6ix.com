import {BasicLink, Button, Typography} from '@ht6/react-ui';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import InputButton from '../../components/InputButton';
import PageSection from '../../components/PageSection';
import Socials from '../../components/Socials';
import TurnstileChallenge from "../../components/TurnstileChallenge";
import VCarousel from './VCarousel/VCarousel';

import toast from 'react-hot-toast';
import Cloud from '../../images/splash/cloud.svg';
import Ship from '../../images/splash/ship.svg';
import { ApiService, ApiServiceError } from '../../utils';
import {
  carousel,
  cloud,
  container,
  dates,
  eventType,
  hideDesktop,
  hideMobile,
  ship,
  shipWrapper,
  signUpText,
  socials,
  splashContent,
  text,
  textHighlight,
  title,
  applyContainer,
  apply
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
          applications {
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

const words = ['learn.', 'network.', 'win.', 'create a project.', 'collaborate.'];

function Splash() {
  const data = useStaticQuery<GatsbyTypes.SplashQueryQuery>(query);
  const startDate = new Date(data.allSite.nodes[0].siteMetadata!.event!.start!);
  const endDate = new Date(data.allSite.nodes[0].siteMetadata!.event!.end!);
  const isSameMonth = startDate.getMonth() === endDate.getMonth();

  // const appsStartDate = new Date(data.allSite.nodes[0].siteMetadata!.applications!.start!);
  // const appsEndDate = new Date(data.allSite.nodes[0].siteMetadata!.applications!.end!);
  const currentDate = new Date();

  // const appsOpen = appsStartDate < currentDate && currentDate < appsEndDate;

  // const [emailInput, setEmailInput] = useState({email: ''});
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
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
  const onSubmit = async () => {
    const id = toast.loading('Loading...');
    try {
      const { response } = ApiService.subscribe({
          email, captchaToken: token
      }, 'subscribe', 'reset');
      toast.success(await response, {id});
      setEmail('');
    } catch (err) {
      switch ((err as any).name) {
        case 'AbbortError':
          break;
        case 'ApiServiceError':
          toast.error((err as ApiServiceError).getHumanError(), { id });
          console.error(err);
          break;
        default:
          toast.error('Unexpected error. Please try again later', { id });
          console.error(err);
          break;
      }
    }
  }

  return (
    <PageSection
      containerClassName={container}
      className={splashContent}
    >
      <div className={shipWrapper}>
        <Cloud className={cloud}/>
        <Ship className={ship}/>
      </div>
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
        {/*<Typography*/}
        {/*    className={cx(text, signUpText)}*/}
        {/*    textColor='neutral-50'*/}
        {/*    textType='paragraph1'*/}
        {/*    as='p'*/}
        {/*>*/}
        {/*  {appsOpen ? "Applications are now open!" : "Applications are now closed! Keep an eye on your inbox in the coming days."}*/}
        {/*</Typography>*/}
        {/* <div className={applyContainer}>
          <Button
            href='https://go.hackthe6ix.com/2024-orgapps'
            rel='noreferrer noopener'
            className={apply}
            target='_blank'
            as={BasicLink}
          >
            Apply to be an organizer!
          </Button>
        </div> */}
        {/* {
          appsOpen ?
              :
              <>
                <InputButton
                    label='Enter email'
                    name='email'
                    buttonText='Notify me'
                    inputProps={{
                      noBorder: true,
                      required: true,
                      opacity: 38,
                      opacityOnHover: 50,
                      placeHolderColor: "primary-50",
                      textColor: "shades-0",
                      value: email,
                      type: 'email',
                      onChange: (e) => setEmail(e.currentTarget.value)
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit();
                      return false;
                    }}
                    style={{cursor: "disabled !important"}}
                >
                </InputButton>
                <TurnstileChallenge onToken={(token) => setToken(token)}/>
              </>
        } */}
        <InputButton
          label='Enter email'
          name='email'
          buttonText='Notify me'
          inputProps={{
            noBorder: true,
            required: true,
            opacity: 38,
            opacityOnHover: 50,
            placeHolderColor: "primary-50",
            textColor: "shades-0",
            value: email,
            type: 'email',
            onChange: (e) => setEmail(e.currentTarget.value)
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            return false;
          }}
          style={{cursor: "disabled !important"}}
        >
        </InputButton>
        <TurnstileChallenge onToken={(token) => setToken(token)}/>
        <Socials
          className={socials}
          baseColor='shades-0'
          activeColor='primary-500' 
          gap='1rem'
        />
    </PageSection>
  );
}

export default Splash;
