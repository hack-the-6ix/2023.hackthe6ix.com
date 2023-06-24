import { useLocation } from '@reach/router';
import {StaticImage} from "gatsby-plugin-image";
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
import Journey from "../sections/Journey";
import WebsiteFullBackgroundNoBackground from '../../static/bgnoheronobg.webp';
import "animate.css/animate.min.css";

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
    children: 'FAQ',
    href: '#faq',
    linkStyle: "pure"
  },
];

const pageBackground = {
  // backgroundColor: "#020F29",
  backgroundImage: `url(${WebsiteFullBackgroundNoBackground})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute",
  pointerEvents: "none"
}

function IndexPage() {
  const location = useLocation();
  return (
    <>
      <div id="page-container" style={{
        overflow: 'clip',
        position: "relative"
      }}>
        <div id="background-container" style={{
          position: "absolute",
          backgroundColor: "#000E28",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: "-10000"
        }}>
          <StaticImage
              src={"../../static/bghero.svg"} alt={"A background"}
              loading={"eager"}
              objectPosition={"73% 0%"}
              quality={80}
              style={{
                position: "absolute",
                top: "0",
                height: "400vh",
                minWidth: "100vw",
                pointerEvents: "none",
              }}/>
          <div
              style={pageBackground}
          ></div>
        </div>
        <Page title='Home'>
          <Navigation links={navLinks} showMlhBanner useScrollSpy />
          <Splash />
          <About />
          <div style={{height: "450px"}} />
          <Journey />
          <div style={{height: "430px"}} />
          <Why />
          <PastSponsors />
          <Notify />
          {/* <PastSpeakers /> */}
          <Faq />
          <Question />
          <Footer />
        </Page>
      </div>
    </>
  );
}

export default IndexPage;
