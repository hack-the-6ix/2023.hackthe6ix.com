import { Colors } from '@ht6/react-ui/dist/styles';
import { IconType } from '@react-icons/all-files';
import { graphql, useStaticQuery } from 'gatsby';
import { CSSProperties, HTMLAttributes } from 'react';
import cx from 'classnames';
import { colorClassName } from '../../utils';
import * as styles from './Socials.module.scss';
import {BasicLink} from "@ht6/react-ui";

const mediaIcons: { [type: string]: IconType } = {
  facebook: require('@react-icons/all-files/fa/FaFacebook').FaFacebook,
  instagram: require('@react-icons/all-files/fa/FaInstagram').FaInstagram,
  twitter: require('@react-icons/all-files/fa/FaTwitter').FaTwitter,
  linkedin: require('@react-icons/all-files/fa/FaLinkedin').FaLinkedin,
};

const query = graphql`
  query SocialsQuery {
    allSite {
      nodes {
        siteMetadata {
          socials {
            link
            type
          }
        }
      }
    }
  }
`;

export type SocialsProps = {
  baseColor: Colors;
  activeColor?: Colors;
  gap: `${number}rem`;
} & HTMLAttributes<HTMLUListElement>;

function Socials({ baseColor, activeColor, gap, ...props }: SocialsProps) {
  const { allSite } = useStaticQuery<GatsbyTypes.SocialsQueryQuery>(query);
  return (
    <ul
      {...props}
      style={{ '--socials-g': gap } as CSSProperties}
      className={cx(props.className, styles.icons)}
    >
      {allSite.nodes[0].siteMetadata!.socials!.map((social, key) => {
        const Icon = mediaIcons[social!.type!];
        return (
          <li className={styles.iconItem} key={key}>
            <BasicLink
              rel='noopener noreferrer'
              className={cx(
                styles[colorClassName(baseColor, 'link')],
                styles.link
              )}
              linkColor={activeColor ?? baseColor}
              linkStyle='styled'
              href={social!.link!}
              target='_blank'
            >
              <Icon className={styles.icon} />
            </BasicLink>
          </li>
        );
      })}
    </ul>
  );
}

export default Socials;
