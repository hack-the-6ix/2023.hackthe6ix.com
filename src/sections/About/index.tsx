import { Typography } from '@ht6/react-ui';
import PageSection from '../../components/PageSection';
import {
  items,
  item,
  itemLabel,
  container,
  statsImg,
} from './About.module.scss';
import HackersBackground from '../../images/about-us/hacker-background.svg';
import HackersBorder from '../../images/about-us/hacker-border.svg';
import MentorBackground from '../../images/about-us/mentor-background.svg';
import MentorBorder from '../../images/about-us/mentor-border.svg';
import PrizesBackground from '../../images/about-us/prizes-background.svg';
import PrizesBorder from '../../images/about-us/prizes-border.svg';
import ProjectsBackground from '../../images/about-us/projects-background.svg';
import ProjectsBorder from '../../images/about-us/projects-border.svg';
import WorkshopsBackground from '../../images/about-us/projects-background.svg';
import WorkshopsBorder from '../../images/about-us/projects-border.svg';

const stats = [
  {
    label: 'HACKERS',
    stat: '440+',
  },
  {
    label: 'PROJECTS SUBMITTED',
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
    <PageSection className={container} style={{ background: 'linear-gradient(165.93deg, #FFCFBB 7.98%, #627AA6 66.26%' }}>
      <div>
        <ul className={items}>
          {stats.map(({ label, stat }, key) => (
            <li key={key} className={item}>
              <div>
                {label == 'HACKERS' &&
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HackersBackground className={statsImg} />
                    <HackersBorder className={statsImg} />
                  </div>
                }
                {label == 'PROJECTS SUBMITTED' &&
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ProjectsBackground className={statsImg} />
                    <ProjectsBorder className={statsImg} />
                  </div>
                }
                {label == 'WORKSHOPS' &&
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <WorkshopsBackground className={statsImg} />
                    <WorkshopsBorder className={statsImg} />
                  </div>
                }
                {label == 'IN PRIZES' &&
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PrizesBackground className={statsImg} />
                    <PrizesBorder className={statsImg} />
                  </div>
                }
                {label == 'MENTORS' &&
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MentorBackground className={statsImg} />
                    <MentorBorder className={statsImg} />
                  </div>
                }
              </div>
              <Typography
                className={itemLabel}
                textType='heading2'
                textColor='shades-0'
                textWeight={650}
                as='span'
              >
                {stat}
              </Typography>
              <Typography
                textType='heading4'
                textColor='warning-400'
                as='span'
                style={{ fontSize: '3rem' }}
                textWeight={600}
              >
                {label}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '-2.5rem' }}>
          <Typography
            textType='heading3'
            as='h3'
            textColor='shades-0'
          >
            We're back <span style={{ color: '#FBBF24' }}>in-person</span>
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
