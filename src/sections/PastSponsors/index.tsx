import { Typography } from '@ht6/react-ui';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { CSSProperties } from 'react';
import PageSection from '../../components/PageSection';
import data from './PastSponsors.data';
import {
  container,
  title,
  category,
  link,
  image,
} from './PastSponsors.module.scss';

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
  }>((acc, img) => {
    acc[img.base] = img;
    return acc;
  }, {});
  return (
    <PageSection className={container}>
      <Typography
        id='sponsors'
        className={title}
        textType='heading2'
        as='h2'
        textColor='primary-3'
      >
        Past Sponsors
      </Typography>
      {data.map((group, i) => (
        <ul
          style={{ '--ps-s': group.size, '--ps-g': group.gap } as CSSProperties}
          className={category}
          key={i}
        >
          {group.items.map((item, j) => (
            <li
              style={
                item.offset
                  ? ({ '--ps-s': group.size + item.offset } as CSSProperties)
                  : undefined
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
