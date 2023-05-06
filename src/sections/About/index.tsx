import { Button, Typography } from '@ht6/react-ui';
import { StaticImage } from 'gatsby-plugin-image';
import PageSection from '../../components/PageSection';
import {
  about,
  content,
  action,
  title,
  items,
  item,
  itemLabel,
  container,
} from './About.module.scss';

const stats = [
  {
    label: 'Hackers',
    stat: '600+',
  },
  {
    label: 'Project Submissions',
    stat: '90+',
  },
  {
    label: 'Workshops & Activities',
    stat: '20+',
  },
  {
    label: 'In Prizes',
    stat: '$17k+',
  },
];

function About() {
  return (
    <PageSection className={container}>
      <div className={about}>
        <div className={content} id='about'>
          <Typography textType='heading2' textColor='primary-700' as='h2'>
            About Us
          </Typography>
          <Typography textType='paragraph1' textColor='copy-dark' as='p'>
            Hack the 6ix is the largest summer student-run, not-for-profit
            hackathon now in its eighth iteration, based in Toronto.
          </Typography>
          <Typography textType='paragraph1' textColor='copy-dark' as='p'>
            We take pride in the diversity and talent of our hackers, who help
            us become a key player in the Toronto tech ecosystem. We provide an
            outlet for students to present their ideas of the future.
          </Typography>
          <div>
            <Button
              href='https://hackthe6ix2021.devpost.com'
              rel='noopener noreferrer'
              className={action}
              target='_blank'
              as='a'
            >
              View Past Projects
            </Button>
          </div>
        </div>
        <StaticImage
          src='../../images/about-us.png'
          alt='An interpretation of Toronto new city hall'
          layout='fullWidth'
          quality={100}
        />
      </div>
      <div>
        <Typography
          className={title}
          textType='heading3'
          textColor='primary-700'
          as='h3'
        >
          Last Year We Had
        </Typography>
        <ul className={items}>
          {stats.map(({ label, stat }, key) => (
            <li key={key}>
              <p className={item}>
                <Typography
                  className={itemLabel}
                  textType='heading1'
                  textColor='primary-500'
                  textWeight={700}
                  as='span'
                >
                  {stat}
                </Typography>
                <Typography textType='heading4' textColor='copy-dark' as='span'>
                  {label}
                </Typography>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}

export default About;
