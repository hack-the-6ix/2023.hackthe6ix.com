import { useLocation } from '@reach/router';
import Footer from '../components/Footer';
import Navigation, { NavigationProps } from '../components/Navigation';
import Page from '../components/Page';
import About from '../sections/About';
import Faq from '../sections/Faq';
import Notify from '../sections/Notify';
import PastSpeakers from '../sections/PastSpeakers';
import PastSponsors from '../sections/PastSponsors';
import Question from '../sections/Question';
import Splash from '../sections/Splash';
import Why from '../sections/Why';

const navLinks: NavigationProps['links'] = [
  {
    children: 'About',
    href: '#about',
    linkStyle: "pure"
  },
  {
    children: 'Why Us?',
    href: '#why-us',
    linkStyle: "pure"
  },
  {
    children: 'Sponsors',
    href: '#sponsors',
    linkStyle: "pure"
  },
  {
    children: 'Past Speakers',
    href: '#past-speakers',
    linkStyle: "pure"
  },
  {
    children: 'FAQ',
    href: '#faq',
    linkStyle: "pure"
  },
];

function IndexPage() {
  const location = useLocation();
  return (
    <Page title='Home'>
      <Navigation links={navLinks} showMlhBanner useScrollSpy />
      <Splash />
      <About />
      <Why />
      <PastSponsors />
      <Notify />
      {/* <PastSpeakers /> */}
      <Faq />
      <Question />
      <Footer />
    </Page>
  );
}

export default IndexPage;
