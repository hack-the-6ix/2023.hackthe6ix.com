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
    size: 30,
    gap: 1,
    tier: "platinum",
    items: [
      {
        name: 'Department of Computer Science @ TMU',
        fileName: 'tmucs.webp',
        url: 'https://www.torontomu.ca/cs/',
      }
    ],
  },
  {
    size: 18,
    gap: 2,
    tier: "silver",
    items: [
      {
        name: 'FDM',
        fileName: 'fdm.png',
        url: 'https://www.fdmgroup.com/',
      },
      {
        name: 'Altura',
        fileName: 'altura.webp',
        url: 'https://alturanft.com/',
      }
    ],
  },
  // {
  //   size: 13.5,
  //   gap: 2,
  //   tier: "silver",
  //   items: [
  //     {
  //       name: 'Staples Studio',
  //       fileName: 'staplesstudio.webp',
  //       url: 'https://studio.staples.ca/studio/torontocorktown',
  //       // offset: -25
  //     },
  //     {
  //       name: 'Ontario Teachers Pension Plan',
  //       fileName: 'otpp.webp',
  //       url: 'https://www.otpp.com/en-ca/careers',
  //     },
  //   ],
  // },
  {
    size: 9,
    gap: 2,
    tier: "bronze",
    items: [
      {
        name: 'Best Buy',
        fileName: 'bestbuy.webp',
        url: 'https://www.bestbuy.com/',
      },
      {
        name: 'Master of Management Analytics Program at Rotman School of Management',
        fileName: 'rotmanmma.webp',
        url: 'https://www.rotman.utoronto.ca/degrees/mastersprograms/mma'
      },
      {
        name: 'Master of Financial Risk Management Program at Rotman School of Management',
        fileName: 'rotmanmfrm.webp',
        url: 'https://www.rotman.utoronto.ca/degrees/mastersprograms/mfrm'
      },
    ],
  },
  {
    size: 5.25,
    gap: 2,
    tier: "bronze",
    items: [
      {
        name: 'GAR',
        fileName: 'gar.webp',
        url: 'https://automationroboticsarduino.com/',
      },
      {
        name: 'XYZ',
        fileName: 'xyz.webp',
        url: 'https://gen.xyz/',
      },
      {
        name: 'Echo3D',
        fileName: 'echo3d.webp',
        url: 'https://www.echo3d.com/',
      },
      {
        name: 'Taskade',
        fileName: 'taskade.webp',
        url: 'https://www.taskade.com/',
      },
      {
        name: 'Voiceflow',
        fileName: 'voiceflow.webp',
        url: 'https://www.voiceflow.com/',
      },
      {
        name: 'Balsamiq',
        fileName: 'balsamiq.webp',
        url: 'https://balsamiq.com/',
      },
      {
        name: "NordVPN",
        fileName: "NordVPN.png",
        url: "https://nordvpn.com"
      },
      {
        name: "incogni",
        fileName: "incogni.png",
        url: "https://incogni.com"
      },
      {
        name: "NordPass",
        fileName: "nordpass.png",
        url: "https://nordpass.com"
      }
    ],
  },
];

export default pastSponsors;
