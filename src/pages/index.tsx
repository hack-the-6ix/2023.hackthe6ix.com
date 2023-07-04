import type React from "react";
import { useLocation } from '@reach/router';
import {StaticImage} from "gatsby-plugin-image";
import Footer from '../components/Footer';
import Navigation, { NavigationProps } from '../components/Navigation';
import Page from '../components/Page';
import About from '../sections/About';
import Faq from '../sections/Faq';
import Notify from '../sections/Notify';
import PastSponsors from '../sections/PastSponsors';
import Question from '../sections/Question';
import Splash from '../sections/Splash';
import Why from '../sections/Why';
import Journey from "../sections/Journey";
import WebsiteFullBackgroundNoBackground from '../images/page-background/effects.webp';
import TestimonialBg from '../images/why-section/testimonial-bg.svg';
import "animate.css/animate.min.css";

import {
  pastHeroSectionSpacer,
  sectionSpacer,
  bgHero,
  bgHeroImg,
  testimonialSpacerBg
} from './index.module.scss';


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
  backgroundImage: `url(${WebsiteFullBackgroundNoBackground})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute" as React.CSSProperties["position"],
  pointerEvents: "none" as React.CSSProperties["pointerEvents"]
}

function IndexPage() {

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
            src={"../images/page-background/bghero.svg"} alt={"A background"}
            loading={"eager"}
            // objectPosition={"73% 50%"}
            quality={80}
            className={bgHero}
            imgClassName={bgHeroImg}
          />
          <div
            style={pageBackground}
          ></div>
        </div>
        <Page title='Home'>
          <Navigation links={navLinks} showMlhBanner useScrollSpy showApply />
          <Splash />
          <About />
          <div className={pastHeroSectionSpacer}>

          </div>
          <Journey />
          <div className={sectionSpacer}>
            <TestimonialBg className={testimonialSpacerBg}/>
          </div>
          <Why />
          <PastSponsors />
          <Notify />
          <Faq />
          <Question />
          <Footer />
        </Page>
      </div>
    </>
  );
}

export default IndexPage;
