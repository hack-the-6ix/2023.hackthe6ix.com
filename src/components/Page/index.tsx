import { StyleProvider, Typography } from '@ht6/react-ui';
import { Toaster, ToastBar } from 'react-hot-toast';
import { graphql, useStaticQuery } from 'gatsby';
import { ReactNode } from 'react';
import Helmet from 'react-helmet';
import { toast } from './Page.module.scss';

export interface PageProps {
  children: ReactNode;
  title: string;
}

const query = graphql`
  query PageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

function Page({ children, title }: PageProps) {
  const { site } = useStaticQuery<GatsbyTypes.PageQueryQuery>(query);

  return (
    <StyleProvider>
      {children}
      <Helmet
        titleTemplate={`%s | ${site?.siteMetadata?.title}`}
        htmlAttributes={{ lang: 'en' }}
        meta={[
          {
            name: 'theme-color',
            content: '#23b5ae',
          },
          {
            name: 'description',
            content: site?.siteMetadata?.description,
          },
          {
            property: 'og:image',
            content: '/banner.jpeg',
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:description',
            content: site?.siteMetadata?.description,
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
        ]}
        title={title}
        defer={false}
      />
      <Toaster position='bottom-center'>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className={toast}>
                <span>{icon}</span>
                <Typography textType='paragraph2' textWeight={600}>
                  {message}
                </Typography>
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </StyleProvider>
  );
}

export default Page;
