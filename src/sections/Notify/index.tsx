import { BasicLink, Button, Typography } from '@ht6/react-ui';
import cx from 'classnames';
import { StaticImage } from 'gatsby-plugin-image';
import { useState } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import InputButton from '../../components/InputButton';
import PageSection from '../../components/PageSection';
import TurnstileChallenge from '../../components/TurnstileChallenge';

import React from 'react';
import toast from "react-hot-toast";
import { ApiService, ApiServiceError } from "../../utils";
import {
  sectionBg,
  cloudRight,
  cloudLeft,
  apply,
  container,
  ctaHeading,
  faqCta,
  headline,
  image,
  root,
  text,
  textHighlight,
} from './Notify.module.scss';

import CloudRight from '../../images/notify-section/notify-bg-right.svg';
import CloudLeft from '../../images/notify-section/notify-bg-left.svg';
import {graphql, useStaticQuery} from "gatsby";

const query = graphql`
  query NotifyQuery {
    allSite {
      nodes {
        siteMetadata {
          applications {
            start
            end
          }
        }
      }
    }
  }
`;

function Notify() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const data = useStaticQuery<GatsbyTypes.NotifyQueryQuery>(query);
  const startDate = new Date(data.allSite.nodes[0].siteMetadata!.applications!.start!);
  const endDate = new Date(data.allSite.nodes[0].siteMetadata!.applications!.end!);
  const currentDate = new Date();

  const appsOpen = startDate < currentDate && currentDate < endDate;

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
  };

  return (

    <PageSection className={root} containerClassName={container} id='notify'>
      <div className={sectionBg}>
        <CloudRight className={cloudRight}/>
        <CloudLeft className={cloudLeft}/>
      </div>
      <AnimationOnScroll animateIn="animate__fadeInUp">
      <StaticImage
        src='../../images/notify-section/rocket.svg'
        alt='laptop'
        quality={100}
        className={image}
      />
      <div className={headline}>
        {
          appsOpen 
          ? 
          (<React.Fragment>
            <Typography
              className={cx(text, ctaHeading)}
              textColor='neutral-50'
              textType='heading2'
              as='h2'
            >
              Ready to be a&nbsp;
              <span className={textHighlight}>hacker?</span>
            </Typography>
            <Typography
            className={text}
            textColor='neutral-50'
            textType='p'
            as='p'
            >
              Let's hack, learn, collaborate, and meet new people.
            </Typography>
          </React.Fragment>
          )
          :
          (<Typography
            className={cx(text, ctaHeading)}
            textColor='neutral-50'
            textType='heading2'
            as='h2'
          >
            Applications open&nbsp;
            <span className={textHighlight}>soon</span>
          </Typography>)
          
        }
        
      </div>
      {
        appsOpen ?
        (<Button
          href='https://dash.hackthe6ix.com'
          rel='noreferrer noopener'
          className={apply}
          target='_blank'
          as={BasicLink}
        >
          Apply Now
        </Button>)
        :
        (<React.Fragment>
          <InputButton
            label='Enter email'
            name='email'
            buttonText='Notify me'
            inputProps={{
              noBorder: true,
              opacity: 38,
              opacityOnHover: 50,
              placeHolderColor: "primary-50",
              textColor: "shades-0",
              required: true,
              value: email,
              type: 'email',
              onChange: (e) => setEmail(e.currentTarget.value)
            }}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
              return false;
            }}
           >
          </InputButton>
          <TurnstileChallenge onToken={(token) => setToken(token)}/>
          <Typography
          className={cx(text, faqCta)}
          textColor='neutral-50'
          textType='paragraph1'
          as='p'
        >
          Have questions? Check out our{' '}
          <BasicLink linkStyle='styled' href='#faq' className={textHighlight}>
            FAQ
          </BasicLink>{' '}
          section.
        </Typography>
        </React.Fragment>)
      }
      </AnimationOnScroll>
      
    </PageSection>
  );
}

export default Notify;
