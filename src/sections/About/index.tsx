import { Typography } from '@ht6/react-ui';
import PageSection from '../../components/PageSection';
import {
  items,
  item,
  itemBackgroundContainer,
  itemLabel,
  container,
  statsImg,
  bottomTextContainer,
  bottomSubtext
} from './About.module.scss';
import cx from 'classnames';
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
    background: <HackersBackground className={cx(statsImg)} />,
    border: <HackersBorder className={cx(statsImg)} />
  },
  {
    label: 'PROJECTS SUBMITTED',
    stat: '68',
    background: <ProjectsBackground className={cx(statsImg)} />,
    border: <ProjectsBorder className={cx(statsImg)} />
  },
  {
    label: 'MENTORS',
    stat: '15',
    background: <WorkshopsBackground className={cx(statsImg)} />,
    border: <WorkshopsBorder className={cx(statsImg)} />
  },
  {
    label: 'SCHOOLS',
    stat: '197',
    background: <MentorBackground className={cx(statsImg)} />,
    border: <MentorBorder className={cx(statsImg)} />
  },
  {
    label: 'IN PRIZES',
    stat: '$15k',
    background: <PrizesBackground className={cx(statsImg)} />,
    border: <PrizesBorder className={cx(statsImg)} />
  },
];

function About() {
  return (
    <PageSection className={cx(container)}>
      <div>
        <ul className={items}>
          {stats.map(({ label, stat , background: statBackground, border: statBorder}, key) => (
            <li key={key} className={cx(item)}>
              <div>
                <div className={cx(itemBackgroundContainer)}>
                  {statBackground}
                  {statBorder}
                </div>
              </div>
              <Typography
                className={cx(itemLabel)}
                textType='heading2'
                textColor='shades-0'
                textWeight={800}
                as='span'
              >
                {stat}
              </Typography>
              <Typography
                textType='heading4'
                textColor='warning-400'
                as='span'
                textWeight={600}
              >
                {label}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div className={cx(bottomTextContainer)}>
        <div style={{ marginBottom: '-2.5rem' }}>
          <Typography
            textType='heading2'
            as='h3'
            textColor='shades-0'
          >
            We're back <wbr /><span style={{ color: '#FBBF24', whiteSpace: "nowrap" }}>in-person</span>
          </Typography>
        </div>
        <div
            className={cx(bottomSubtext)}
        >
          <Typography
              textType='paragraph1'
              as='p'
              textColor='shades-0'
          >
            Join hundreds of students from diverse backgrounds, disciplines, and skill levels to work together on projects that have real-world impact. We'll handle the back-end, so just show up and have fun!
          </Typography>
        </div>


      </div>
    </PageSection>
  );
}

export default About;
