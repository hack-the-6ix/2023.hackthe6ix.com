type PastSponsorGroup = {
  size: number;
  gap: number;
  items: {
    name: string;
    fileName: string;
    url: string;
    offset?: number;
  }[];
};
const pastSponsors: (PastSponsorGroup & { tier: string })[] = [
  {
    size: 25.75,
    gap: 2,
    tier: "gold",
    items: [
      {
        name: 'Buf',
        fileName: 'buf.png',
        url: 'https://buf.build/',
      },
      {
        name: 'Wealthsimple',
        fileName: 'wealthsimple.png',
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
        fileName: 'staplesstudio.png',
        url: 'https://studio.staples.ca/studio/torontocorktown',
        // offset: -25
      },
      {
        name: 'Ontario Teachers Pension Plan',
        fileName: 'otpp.png',
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
        fileName: 'pwc.png',
        url: 'https://www.pwc.com/ca/en/careers/campus-recruiting/job-search.html',
      },
      {
        name: 'FDM',
        fileName: 'fdm.png',
        url: 'https://apply.fdmgroup.com/?chkCategory=1&chkCategory=3&lstRegion=10',
      },
      {
        name: 'AMD',
        fileName: 'amd.png',
        url: 'https://www.amd.com/en',
      },
      {
        name: 'Balsamiq',
        fileName: 'balsamiq.png',
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
        fileName: 'echo3d.png',
        url: 'https://www.echo3d.co',
      },
      {
        name: 'StandOut Stickers',
        fileName: 'standoutstickers.png',
        url: 'https://www.standoutstickers.com/',
      },
      {
        name: 'Unity',
        fileName: 'unity.png',
        url: 'https://unity.com/students',
      },
      {
        name: 'Voiceflow',
        fileName: 'voiceflow.png',
        url: 'https://www.voiceflow.com/',
      },
    ],
  },
];

export default pastSponsors;
