import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { Typography } from '@ht6/react-ui';
import PageSection from '../../components/PageSection';
import {
  container,
  heading,
  items,
  item,
  content,
  header,
  body,
  image,
} from './PastSpeakers.module.scss';
import { CSSProperties, useEffect, useRef, useState } from 'react';

const speakers = [
  {
    name: 'Jonathan Javier',
    title: 'CEO/Founder @Wonsulting',
    image: 'jonathan.png',
    content:
      "Jonathan's mission at Wonsulting is to “turn underdogs into winners”. He's also worked in the Strategy and Operations team at Snap, Google, and Cisco coming from a non-target school/non-traditional background. He works on many initiatives, providing advice and words of wisdom on LinkedIn and through speaking engagements. In total, he has led 125+ workshops in 8 different countries including the Mena ICT Forum in Jordan, Resume/Personal Branding at Cisco, LinkedIn Strategy & Operations Offsite, Great Place To Work, Talks at Google, TEDx, and more. He's amassed 52,000+ followers on LinkedIn as well as 15+ million views yearly on his content.",
  },
  {
    name: 'Cathy Tie',
    title: 'Serial Entrepreneur & VC',
    image: 'cathy.png',
    content:
      'Cathy is a serial entrepreneur and VC working on a new stealth company. She was most recently a Partner at Cervin Ventures, a $200M technology investment fund based in San Francisco. Prior to Cervin Ventures, Cathy was the CEO and co-founder at Ranomics, a venture backed company known for its gene variant synthesis platform that enables antibody optimization, drug target validation, and enzyme, protein and organism engineering. Cathy founded Ranomics at the age of 18, and was the youngest person to raise venture capital in biotechnology. Cathy was also named a Thiel Fellow in 2015 and a recipient of the Forbes 30 Under 30 list award in 2018.',
  },
  {
    name: 'Pei Li',
    title: 'Founder @ Hack the 6ix',
    image: 'pei.png',
    content:
      'Pei founded Hack The 6ix during his time in the EngSci program at University of Toronto. He dropped out in 2016 to join Wealthsimple in its early stages and to pursue entrepreneurship. In 2017, Pei founded Beatcamp, a music licensing platform for hip-hop producers. After the platform was acquired in 2018, he founded CodeMode, a technology consultancy that specializes in digital transformation for enterprises. Pei is now working on Venue, an all-in-one live online events streaming platform. They are working closely with early customers such as TechTO to deliver a unique and engaging experience to event attendees.',
  },
];

const query = graphql`
  query PastSpeakersSectionQuery {
    allFile(filter: { relativeDirectory: { eq: "past-speakers" } }) {
      nodes {
        base
        childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
    }
  }
`;

function Speaker({
  speaker,
  img,
}: {
  speaker: typeof speakers[number];
  img: IGatsbyImageData;
}) {
  const [offset, setOffset] = useState<number>(-1);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!headerRef.current) return;
    const handler = () => {
      setOffset(headerRef.current?.offsetHeight ?? 0);
    };

    window.addEventListener('resize', handler, true);
    handler();

    return () => {
      window.removeEventListener('resize', handler, true);
    };
  }, []);

  return (
    <li
      style={{ '--offset': offset } as CSSProperties}
      className={item}
      tabIndex={0}
    >
      <div className={content}>
        <div ref={headerRef} className={header}>
          <Typography textType='heading3' as='h3'>
            {speaker.name}
          </Typography>
          <Typography textType='heading4' as='p'>
            {speaker.title}
          </Typography>
        </div>
        <Typography className={body} textType='paragraph1' as='p'>
          {speaker.content}
        </Typography>
      </div>
      <GatsbyImage
        className={image}
        image={img}
        alt={`Headshot of ${speaker.name}`}
      />
    </li>
  );
}

function PastSpeakers() {
  const data = useStaticQuery<GatsbyTypes.PastSpeakersSectionQueryQuery>(query);
  return (
    <PageSection className={container}>
      <Typography
        id='past-speakers'
        className={heading}
        textType='heading2'
        textColor='primary-3'
        as='h2'
      >
        Past Keynote Speakers
      </Typography>
      <ul className={items}>
        {speakers.map((speaker, key) => {
          const fileNode = data.allFile.nodes.find(
            (node) => node.base === speaker.image
          );
          return (
            <Speaker
              img={fileNode?.childImageSharp?.gatsbyImageData!}
              speaker={speaker}
              key={key}
            />
          );
        })}
      </ul>
    </PageSection>
  );
}

export default PastSpeakers;
