type PastSponsorGroup = {
  size: number;
  tier: string;
  gap: number;
  items: {
    name: string;
    fileName: string;
    url: string;
    offset?: number;
  }[];
};
const pastSponsors: PastSponsorGroup[] = [
  {
    size: 25.75,
    gap: 2,
    tier: "gold",
    items: [
      {
        name: 'Buf',
        fileName: 'buf.webp',
        url: 'https://buf.build/',
      },
      {
        name: 'Wealthsimple',
        fileName: 'wealthsimple.webp',
        url: 'https://wealthsimple.com',
      },
    ],
  },
  {
    size: 13.5,
    gap: 2,
    tier: "silver",
    items: [
      {
        name: 'Staples Studio',
        fileName: 'staplesstudio.webp',
        url: 'https://studio.staples.ca/studio/torontocorktown',
        // offset: -25
      },
      {
        name: 'Ontario Teachers Pension Plan',
        fileName: 'otpp.webp',
        url: 'https://www.otpp.com/en-ca/careers',
      },
    ],
  },
  {
    size: 8.25,
    gap: 2,
    tier: "bronze",
    items: [
      {
        name: 'PWC',
        fileName: 'pwc.webp',
        url: 'https://www.pwc.com/ca/en/careers/campus-recruiting/job-search.html',
      },
      {
        name: 'FDM',
        fileName: 'fdm.webp',
        url: 'https://apply.fdmgroup.com/?chkCategory=1&chkCategory=3&lstRegion=10',
      },
      {
        name: 'AMD',
        fileName: 'amd.webp',
        url: 'https://www.amd.com/en',
      },
      {
        name: 'Balsamiq',
        fileName: 'balsamiq.webp',
        url: 'https://balsamiq.com/wireframes/',
      },
    ],
  },
  {
    size: 8.25,
    gap: 2,
    tier: "bronze",
    items: [
      {
        name: 'Echo3D',
        fileName: 'echo3d.webp',
        url: 'https://www.echo3d.co',
      },
      {
        name: 'StandOut Stickers',
        fileName: 'standoutstickers.webp',
        url: 'https://www.standoutstickers.com/',
      },
      {
        name: 'Unity',
        fileName: 'unity.webp',
        url: 'https://unity.com/students',
      },
      {
        name: 'Voiceflow',
        fileName: 'voiceflow.webp',
        url: 'https://www.voiceflow.com/',
      },
    ],
  },
];

export default pastSponsors;
