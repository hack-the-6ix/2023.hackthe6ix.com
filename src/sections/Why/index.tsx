import { Button, Typography } from '@ht6/react-ui';
import { graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import cx from 'classnames';
import { useMemo, useState } from 'react';
import PageSection from '../../components/PageSection';
import Slides from './Slides';
import {
  root,
  title,
  whyTitle,
  titleDesc,
  italicsTitle,
  contentIntro,
  slidesWrapper
} from './Why.module.scss';

const slides = [
  {
    image: 'samson.png',
    title: 'Thank you so much for this amazing opportunity.1',
    content:
      'I had such an amazing time this weekend. I really enjoyed my first hackathon and stepping out of my comfort zone and I am definitely looking to participate in more in the future.',
    name: 'Samson Hua',
    role: 'Hacker',
  },
  {
    image: 'wilson.png',
    title: 'Thank you so much for this amazing opportunity.2',
    content:
      'I had such an amazing time this weekend. I really enjoyed my first hackathon and stepping out of my comfort zone and I am definitely looking to participate in more in the future.',
    name: 'Samson Hua',
    role: 'Hacker',
  },
  {
    image: 'aaiman.png',
    title: 'Thank you so much for this amazing opportunity.3',
    content:
      'I had such an amazing time this weekend. I really enjoyed my first hackathon and stepping out of my comfort zone and I am definitely looking to participate in more in the future.',
    name: 'Samson Hua',
    role: 'Hacker',
  },
  {
    image: 'wilson.png',
    title: 'Thank you so much for this amazing opportunity.4',
    content:
      'I had such an amazing time this weekend. I really enjoyed my first hackathon and stepping out of my comfort zone and I am definitely looking to participate in more in the future.',
    name: 'Samson Hua',
    role: 'Hacker',
  },
  {
    image: 'sam.png',
    title: 'Thank you so much for this amazing opportunity.5',
    content:
      'I had such an amazing time this weekend. I really enjoyed my first hackathon and stepping out of my comfort zone and I am definitely looking to participate in more in the future.',
    name: 'Samson Hua',
    role: 'Hacker',
  },
  // {
  //   image: 'sam.png',
  //   title: 'It was so nice to guide students through their projects.',
  //   content:
  //     "Whether it was simply providing feedback on project ideas, or helping hackers deploy apps, connect their React apps to backends, and build API's for their projects, I had a great time.",
  //   name: 'Sam Eskandar',
  //   role: 'Mentor',
  // },
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

  // const textItems = [
  //   {
  //     title: 'Want to land your next internship?',
  //     icon: require('../../images/why-section/icons/laptop.svg'),
  //     content:
  //       "Hackathons are an amazing place to meet mentors and industry professionals in the tech community. A pandemic won't stop us from fostering important conversations.",
  //   },
  //   {
  //     title: 'Looking to learn from experts?',
  //     icon: require('../../images/why-section/icons/star.svg'),
  //     content:
  //       "We value sharing knowledge and applying the things we learned. We'll host live workshops all weekend to give you the inspiration you need to get your project off the ground.",
  //   },
  //   {
  //     title: 'Want to be rewarded for your work?',
  //     icon: require('../../images/why-section/icons/money.svg'),
  //     content: "With $17K+ worth of prizes, there's something for everyone.",
  //     action: {
  //       onClick: () => setShowPopup(true),
  //       children: 'Prizes',
  //     },
  //   },
  //   {
  //     title: 'Need projects for your portfolio?',
  //     icon: require('../../images/why-section/icons/light-bulb.svg'),
  //     content:
  //       'Complete a project worth showcasing within 48 hours from scratch and land your next job. Check out what our hackers created last year!',
  //     action: {
  //       children: '2021 Project Gallery',
  //       as: 'a' as any,
  //       href: 'https://hackthe6ix2021.devpost.com',
  //       rel: 'noreferrer noopener',
  //       target: '_blank',
  //     },
  //   },
  // ];

  return (
    <div className={root}>
      <div className={contentIntro}>
        <Typography
          className={title}
          textColor='shades-0'
          textType='heading2'
          textWeight='800'
          id='why-us'
          as='h2'
        >
          Ready to <span className={whyTitle}> leave your mark?</span>
        </Typography>
        <Typography
          className={titleDesc}
          textColor='shades-0'
          textType='paragraph1'
          id='details'
          as='p'
        >
          We understand making a change is difficult. At Hack the 6ix, we aim to inspire young hackers to tackle complex challenges, explore the possibilities of technology, and to build the world of tomorrow by giving the support they need.
        </Typography>
        <Typography
          className={cx(titleDesc, italicsTitle)}
          textColor='shades-0'
          textType='heading6'
          textWeight='700'
          id='sub-details'
          as='h6'
        >
          Join us in our <span className={whyTitle}>9th iteration</span> to discover, collaborate, and push the boundaries of technology.         
        </Typography>
      </div>
      <div className={slidesWrapper}>
        <Slides headingLevel='h3' slides={transformedData} />
      </div>
    </div>
  );
}

export default Why;
