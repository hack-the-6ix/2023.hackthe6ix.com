import { Button, Typography } from '@ht6/react-ui';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { CSSProperties } from 'react';
import PageSection from '../../components/PageSection';
import data from './PastSponsors.data';
import {
  category,
  container,
  image,
  link,
  sponsorCTA,
  title
} from './PastSponsors.module.scss';

import { AnimationOnScroll } from 'react-animation-on-scroll';

const query = graphql`
  query PastSponsorsQuery {
    allFile(filter: { relativeDirectory: { eq: "past-sponsors" } }) {
      nodes {
        base
        childImageSharp {
          gatsbyImageData(height: 100, quality: 100)
        }
      }
    }
  }
`;

function PastSponsors() {
  const { allFile } = useStaticQuery<GatsbyTypes.PastSponsorsQueryQuery>(query);
  const imageMap = allFile.nodes.reduce<{
    [base: string]: GatsbyTypes.PastSponsorsQueryQuery['allFile']['nodes'][0];
  }>((acc:any, img:any) => {
    acc[img.base] = img;
    return acc;
  }, {});
  return (
    <PageSection className={container}>
      <AnimationOnScroll animateIn="animate__fadeInDown">
      <Typography
        id='sponsors'
        className={title}
        textType='heading2'
        as='h2'
        textColor='shades-0'
      >
        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center', }}>
          Sponsor the <span style={{color: '#FBBF24'}}>next big idea</span> 
        </span>
        
      </Typography>
      <Typography
        id='sponsors'
        textType='paragraph1'
        as='p'
        textColor='shades-0'
      >
        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>Special thanks to our past sponsors for supporting Hack the 6ix and the incubation of big ideas. </span>
        <br />
        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>Want to help us make it even better?</span>
      </Typography>
      </AnimationOnScroll>
      <Button
        buttonColor='primary-500'
        className={sponsorCTA}
        onClick={() => {window.open('http://go.hackthe6ix.com/2023-sponsorpack')}}
      >
          Become a sponsor
      </Button>
      {data.map((group, i) => (
        <ul
          style={{ '--ps-s': group.size, '--ps-g': group.gap } as CSSProperties}
          className={`${category} ${i >= data.length - 2 ? 'bronze' : ''}`}
          key={i}
        >
          {group.items.map((item, j) => (
            <li
              style={
                item.offset
                  ? ({ '--ps-s': group.size + item.offset, 'minHeight': '10px' } as CSSProperties)  
                  : ({ 'minHeight': '100px' } as CSSProperties)
              }
              key={j}
            >
              <a
                className={link}
                target='_blank'
                rel='noreferrer noopener'
                href={item.url}
              >
                <GatsbyImage
                  image={
                    imageMap[item.fileName].childImageSharp?.gatsbyImageData!
                  }
                  className={image}
                  alt={item.name}
                />
              </a>
            </li>
          ))}
        </ul>
      ))}
    </PageSection>
  );
}

export default PastSponsors;
