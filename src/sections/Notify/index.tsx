import {Typography, Button, BasicLink} from '@ht6/react-ui';
import { StaticImage } from 'gatsby-plugin-image';
import { useState } from 'react';
import Highlight from '../../components/Highlight';
import PageSection from '../../components/PageSection';
import {
  container,
  text,
  root,
  headline,
  image,
  apply,
} from './Notify.module.scss';

function Notify() {
  const [email, setEmail] = useState('');
  return (
    <PageSection className={root} containerClassName={container} id='notify'>
      <StaticImage
        src='../../images/laptop.png'
        alt='laptop'
        quality={100}
        className={image}
      />
      <div className={headline}>
        <Typography
          className={text}
          textColor='primary-700'
          textType='heading2'
          as='h2'
        >
          Applications are&nbsp;
          <Highlight highlightColor='warning-400'>now open!</Highlight>
        </Typography>
        <Typography
          className={text}
          textColor='primary-700'
          textType='heading4'
          as='p'
        >
          Don't miss out. Apply below and we look forward to seeing you this
          summer!
        </Typography>
      </div>
      <Button
        href='https://dash.hackthe6ix.com'
        rel='noreferrer noopener'
        className={apply}
        target='_blank'
        as={BasicLink}
      >
        Apply Now
      </Button>
      <Typography
        className={text}
        textColor='primary-700'
        textType='paragraph1'
        as='p'
      >
        Got questions? Check out our{' '}
        <BasicLink linkStyle='styled' href='#faq'>
          FAQ
        </BasicLink>{' '}
        section!
      </Typography>
    </PageSection>
  );
}

export default Notify;
