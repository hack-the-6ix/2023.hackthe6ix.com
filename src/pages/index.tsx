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
    linkType: 'anchor',
    children: 'About',
    to: '#about',
  },
  {
    linkType: 'anchor',
    children: 'Why Us?',
    to: '#why-us',
  },
  {
    linkType: 'anchor',
    children: 'Sponsors',
    to: '#sponsors',
  },
  {
    linkType: 'anchor',
    children: 'Past Speakers',
    to: '#past-speakers',
  },
  {
    linkType: 'anchor',
    children: 'FAQ',
    to: '#faq',
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
      <PastSpeakers />
        <Notify/>
      <Faq />
      <Question />
      <Footer />
    </Page>
  );
}

export default IndexPage;
