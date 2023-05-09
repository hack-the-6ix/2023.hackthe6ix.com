import type {GatsbyConfig, PluginRef} from 'gatsby';
require('dotenv').config();

type Environments = 'production' | 'development';
const buildEnv =
  process.env.BUILD_ENV ??
  process.env.NODE_ENV ??
  ('development' as Environments);
const isDev = buildEnv === 'development';

const config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: `Hack the 6ix`,
    siteUrl:
      process.env.SITE_URL ??
      process.env.DEPLOY_PRIME_URL ??
      process.env.DEPLOY_URL ??
      '',
    event: {
      start: new Date('2023-8-18 09:00:00 GMT-0400'),
      end: new Date('2023-8-20 23:59:59 GMT-0400'),
    },
    applications: {
      start: new Date(),
      end: new Date(),
    },
    socials: [
      {
        type: 'facebook',
        link: 'https://www.facebook.com/HackThe6ix',
      },
      {
        type: 'instagram',
        link: 'https://www.instagram.com/hackthe6ix',
      },
      {
        type: 'twitter',
        link: 'https://twitter.com/hackthe6ix?lang=en',
      },
      {
        type: 'linkedin',
        link: 'https://linkedin.com/company/hackthe6ixofficial',
      },
    ],
    featureFlags: {
      applications: false,
    },
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        emitSchema: {
          'src/__generated__/gatsby-introspection.json': true,
        },
        emitPluginDocuments: {
          'src/__generated__/gatsby-plugin-documents.graphql': true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/.*\.svg/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo.svg',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    'gatsby-plugin-netlify',
    !isDev && 'gatsby-plugin-mini-css-class-name',
  ].filter(Boolean) as PluginRef[],
};

export default config;
