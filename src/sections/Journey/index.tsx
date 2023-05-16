import { Button, Typography } from "@ht6/react-ui";
import { useState } from "react";
import PageSection from "../../components/PageSection";
import {
  root,
  title,
  airplane,
  points,
  point,
  heading,
  text,
} from "./Journey.module.scss";

const textItems = [
  {
    title: "Make Memories",
    image: require("../../images/journey-section/memories.svg"),
    content: (
      <>
        <em>Work hard, play hard.</em> Share laughs with your teammates — the
        most memorable part of a hackathon are the people we work with!
      </>
    ),
  },
  {
    title: "Form Connections",
    image: require("../../images/journey-section/connections.svg"),
    content:
      "Hackathons are an amazing place to meet new friends, mentors, and industry professionals in the tech community.",
  },
  {
    title: "Learn, Apply, Create",
    image: require("../../images/journey-section/learn.svg"),
    content:
      "We value sharing knowledge and applying the things we learned. We want to see what you’re capable of and so does everyone else!",
  },
];

function JourneyPoint({ item }: { item: (typeof textItems)[number] }) {
  return (
    <li className={point} tabIndex={0}>
      <item.image />
      <Typography
        className={heading}
        textColor="neutral-50"
        textType="heading3"
        textWeight="extra-bold"
        as="h3"
      >
        <span>{item.title}</span>
      </Typography>
      <Typography
        className={text}
        textColor="neutral-50"
        textType="heading6"
        textWeight="medium"
        as="h6"
      >
        {item.content}
      </Typography>
    </li>
  );
}

function Journey() {
  const PaperAirplane = require("../../images/journey-section/paper-airplane.svg");

  return (
    <PageSection containerClassName={root}>
      <PaperAirplane className={airplane} />
      <div id="journey">
        <Typography
          className={title}
          textColor="neutral-50"
          textType="heading1"
          textWeight="extra-bold"
          as="h1"
        >
          Start your&nbsp;
        </Typography>
        <Typography
          className={title}
          textColor="warning-400"
          textType="heading1"
          textWeight="extra-bold"
          as="h1"
        >
          journey
        </Typography>
      </div>
      <ul className={points}>
        {textItems.map((item, key) => (
          <JourneyPoint item={item} key={key} />
          /**<li key={key}>
            <Typography
              className={heading}
              textColor="primary-700"
              textType="heading3"
              as="h3"
            >
              <span>{item.title}</span>
            </Typography>
            <Typography
              className={text}
              textColor="copy-dark"
              textType="paragraph1"
              as="p"
            >
              {item.content}
            </Typography>
          </li>**/
        ))}
      </ul>
    </PageSection>
  );
}

export default Journey;
