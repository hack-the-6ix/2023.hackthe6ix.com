import { Typography } from '@ht6/react-ui';
import PageSection from '../../components/PageSection';
import {
  items,
  item,
  itemLabel,
  container,
} from './About.module.scss';

const stats = [
  {
    label: 'HACKERS',
    stat: '440+',
  },
  {
    label: 'PROJECT SUBMITTED',
    stat: '68',
  },
  {
    label: 'WORKSHOPS',
    stat: '20+',
  },
  {
    label: 'IN PRIZES',
    stat: '$15k',
  },
  {
    label: 'MENTORS',
    stat: '8',
  },
];

function About() {
  return (
    <PageSection className={container}>
      <div>
        <ul className={items}>
          {stats.map(({ label, stat }, key) => (
            <li key={key}>
              <p className={item}>
                <Typography
                  className={itemLabel}
                  textType='heading2'
                  textColor='shades-0'
                  textWeight={700}
                  as='span'
                >
                  {stat}
                </Typography>
                <Typography textType='heading3' textColor='warning-400' as='span'>
                  {label}
                </Typography>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div  style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{marginBottom: '-2.5rem'}}> 
        <Typography
          textType='heading3'
          as='h3'
          textColor='shades-0'
        >
          We're back <span style={{color: '#FBBF24'}}>in-person</span> 
        </Typography>
        </div>
        <Typography
          textType='paragraph1'
          as='p'
          textColor='shades-0'
        >
         Join hundreds of students from diverse backgrounds, disciplines, and skill levels to work together on 
          <br />
          <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>projects that have real-world impact. We'll handle the back-end, so just show up and have fun!</span>
        </Typography>
      </div>
    </PageSection>
  );
}

export default About;
