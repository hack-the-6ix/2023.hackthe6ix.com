import { Typography, Button } from '@ht6/react-ui';
import { StaticImage } from 'gatsby-plugin-image';
import { useState } from 'react';
import Highlight from '../../components/Highlight';
import PageSection from '../../components/PageSection';
import Link from '../../components/Link';
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
          <Highlight highlightColor='primary-4'>now open!</Highlight>
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
        to='https://dash.hackthe6ix.com'
        rel='noreferrer noopener'
        className={apply}
        target='_blank'
        linkType='anchor'
        as={Link}
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
        <Link linkType='anchor' linkStyle='styled' to='#faq'>
          FAQ
        </Link>{' '}
        section!
      </Typography>
    </PageSection>
  );
}

export default Notify;
