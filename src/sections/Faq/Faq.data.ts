const questionGroups: Array<{
  category: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}> = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is Hack the 6ix?',
        answer:
          'Hack the 6ix is a live event where “hackers” (participants) design, develop, and pitch a software or hardware project built from scratch over the course of 36 hours. We will provide you with the resources and mentorship needed in order to make this happen!',
      },
      {
        question:
          'What kind of workshops, talks, and activities will there be at Hack the 6ix?',
        answer:
          'We’ll be hosting a variety of workshops ranging from introductory to advanced topics facilitated by our amazing sponsors and mentors. In addition, there will also be interesting tech talks by industry leaders from different companies. For breaks, we’ll have a ton of fun activities planned for you, such as games, contests, and more! Hack the 6ix is much more than just a hackathon – we want it to be an event that you’ll thoroughly enjoy while expanding your skillset and network.',
      },
      {
        question: 'Can I work on my hack before the event?',
        answer:
          'No. To maintain competition integrity and fairness, all work on your hack must be done at the event. All projects with prior work done will be eliminated from judging. However, you are encouraged to touch up on your skills or bring any hardware in preparation for the event!',
      },
    ],
  },
  {
    category: 'Application',
    questions: [
      {
        question: 'When do hacker applications open?',
        answer:
          'Hack the 6ix applications are opening soon. Subscribe here if you’d like us to notify you when applications are out!',
      },
      {
        question: 'Am I eligible to participate?',
        answer:
          'Any post-secondary students or recent graduates (>1 years of graduating) are eligible to participate in our event.',
      },
      {
        question: 'Do I need to know how to code?',
        answer:
          'Nope! Our mentors and workshops make sure that even if you’re new to coding, you’ll definitely pick up enough skills at the event to make a project. In addition, if you’re a designer or business student, your design and pitching skills are also very valuable!',
      },
      {
        question: 'Can I sign up with a team?',
        answer:
          'We allow team sign-ups of up to 4 people. All team members must sign up individually and specify the other team members on their application.',
      },
      {
        question: 'What if I don’t have a team or idea?',
        answer:
          'Don’t worry, you will have a chance to form or join a team by messaging the participant groups/chats that we’ll put you in during the weeks leading up to the weekend, as well as through team formation activities during the event.',
      },
    ],
  },
  {
    category: 'Preparation',
    questions: [
      {
        question: 'How do I get to Hack the 6ix?',
        answer:
          'We\'re still finalizing our venue details for 2023, but Hack the 6ix is usually held somewhere in Toronto. Subscribe to email updates and check out our social media pages to be the first to know!',
      },
      {
        question: 'What should I bring?',
        answer:
          'Make sure to bring your laptop (or desktop) and a piece of valid student ID or government ID! You can also bring a pillow and blanket if you want to get comfy. Everything else will be provided for you!',
      },
      {
        question: 'Will there be hardware provided at the event?',
        answer:
          'We have a variety of hardware that can be borrowed at our hardware station for free, including Raspberry Pi’s, Arduinos, sensors, and breadboards. Due to limited quantity, hardware will be lent out on a first come, first serve basis. If you are unsure whether or not we have a certain piece of hardware that you will need for your hack, bring your own to the event!',
      },
      {
        question: 'How much does it cost to attend?',
        answer:
          'Absolutely nothing! Hack the 6ix is a completely free event run by a non-profit organization. All food, resources, and accommodations for hacking for the entire event will be provided free of charge.',
      },
    ],
  },
  {
    category: 'Health & Safety',
    questions: [
      {
        question: 'What COVID-19 precautions will be in place at the event?',
        answer:
          'We will be following the guidance put forth by the Ontario Government for large events at the time of the event. More details will follow closer to the event and any major changes to guidelines or precautions will be communicated to event participants.',
      },
    ],
  },
];

export default questionGroups;
