import { Button, Typography } from '@ht6/react-ui';
import { graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useMemo, useState } from 'react';
import PageSection from '../../components/PageSection';
import Popup from '../../components/Popup';
import Slides from './Slides';
import {
  root,
  title,
  content,
  points,
  heading,
  text,
  icon,
  action,
  popup,
  prizeImage,
} from './Why.module.scss';

const slides = [
  {
    image: 'wilson.png',
    title: 'Inspiring, challenging, and exciting.',
    content:
      'Just a few words I would use to describe the past weekend I had at Hack the 6ix, all from the comfort of my own home! Working on our hackathon project remotely was definitely a unique experience and had its own set of challenges, but it was super rewarding and was an incredible learning opportunity.',
    name: 'Willson Wang',
    role: 'Hacker',
  },
  {
    image: 'aaiman.png',
    title:
      'So honored to chat about diversity & inclusion at @HackThe6ix today.',
    content:
      "It's the most organized hackathon I've ever been to (from what feels like millions), and it's all virtual! Well-moderated, great questions, diverse backgrounds+views of the panelists. Kudos to the HT6 team 👏🏻",
    name: 'Aaiman Aamir',
    role: 'Speaker',
  },
  {
    image: 'samson.png',
    title: 'Thank you so much for this amazing opportunity.',
    content:
      'I had such an amazing time this weekend. I really enjoyed my first hackathon and stepping out of my comfort zone and I am definitely looking to participate in more in the future.',
    name: 'Samson Hua',
    role: 'Hacker',
  },
  {
    image: 'sam.png',
    title: 'It was so nice to guide students through their projects.',
    content:
      "Whether it was simply providing feedback on project ideas, or helping hackers deploy apps, connect their React apps to backends, and build API's for their projects, I had a great time.",
    name: 'Sam Eskandar',
    role: 'Mentor',
  },
];

const query = graphql`
  query WhySectionQuery {
    allFile(filter: { relativeDirectory: { eq: "why-section/pictures" } }) {
      nodes {
        base
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

function Why() {
  const data = useStaticQuery<GatsbyTypes.WhySectionQueryQuery>(query);
  const [showPopup, setShowPopup] = useState(false);
  const transformedData = useMemo(() => {
    const imageMap = data.allFile.nodes.reduce<{
      [
        base: string
      ]: GatsbyTypes.WhySectionQueryQuery['allFile']['nodes'][number];
    }>((acc, item) => {
      acc[item.base] = item;
      return acc;
    }, {});

    return slides.map((slide) => ({
      ...slide,
      image: imageMap[slide.image].childImageSharp?.gatsbyImageData! ?? null,
    }));
  }, [data]);

  const textItems = [
    {
      title: 'Want to land your next internship?',
      icon: require('../../images/why-section/icons/laptop.svg'),
      content:
        "Hackathons are an amazing place to meet mentors and industry professionals in the tech community. A pandemic won't stop us from fostering important conversations.",
    },
    {
      title: 'Looking to learn from experts?',
      icon: require('../../images/why-section/icons/star.svg'),
      content:
        "We value sharing knowledge and applying the things we learned. We'll host live workshops all weekend to give you the inspiration you need to get your project off the ground.",
    },
    {
      title: 'Want to be rewarded for your work?',
      icon: require('../../images/why-section/icons/money.svg'),
      content: "With $17K+ worth of prizes, there's something for everyone.",
      action: {
        onClick: () => setShowPopup(true),
        children: 'Prizes',
      },
    },
    {
      title: 'Need projects for your portfolio?',
      icon: require('../../images/why-section/icons/light-bulb.svg'),
      content:
        'Complete a project worth showcasing within 48 hours from scratch and land your next job. Check out what our hackers created last year!',
      action: {
        children: '2021 Project Gallery',
        as: 'a' as any,
        href: 'https://hackthe6ix2021.devpost.com',
        rel: 'noreferrer noopener',
        target: '_blank',
      },
    },
  ];

  return (
    <PageSection containerClassName={root}>
      <Typography
        className={title}
        textColor='primary-700'
        textType='heading2'
        id='why-us'
        as='h2'
      >
        Why Get Involved?
      </Typography>
      <div className={content}>
        <ul className={points}>
          {textItems.map((item, key) => (
            <li key={key}>
              <Typography
                className={heading}
                textColor='primary-700'
                textType='heading3'
                as='h3'
              >
                <span>{item.title}</span>
                <item.icon className={icon} />
              </Typography>
              <Typography
                className={text}
                textColor='copy-dark'
                textType='paragraph1'
                as='p'
              >
                {item.content}
              </Typography>
              {item.action && <Button className={action} {...item.action} />}
            </li>
          ))}
        </ul>
        <Slides headingLevel='h3' slides={transformedData} />
      </div>
      <Popup
        onClose={() => setShowPopup(false)}
        className={popup}
        show={showPopup}
      >
        <StaticImage
          className={prizeImage}
          alt=' Prizes for event. First place - Nintendo Switch, Second place - Beats Fit Pro, Third place - Mechanical Keyboard and Mouse'
          src='../../images/prizes.png'
          objectFit='contain'
          quality={100}
        />
      </Popup>
    </PageSection>
  );
}

export default Why;
