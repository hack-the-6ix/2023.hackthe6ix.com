import { Typography } from "@ht6/react-ui";
import PageSection from "../../components/PageSection";
import AccordionGroup from "../../components/AccordionGroup";
import data from "./Faq.data";
import { faqs, container, faqHeading, root } from "./Faq.module.scss";
import { useEffect, useState } from "react";

function Faq() {
  const [isDesktop, setIsDesktop] = useState<Boolean>(false);

  useEffect(() => {
    const handler = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handler, true);
    handler();
    return () => {
      window.removeEventListener("resize", handler, true);
    };
  }, []);

  return (
    <PageSection className={root} containerClassName={container} id='notify'>
      <Typography
        className={faqHeading}
        id="faq"
        textType="heading1"
        textColor="shades-0"
        textWeight="extra-bold"
        as="h2"
        displayType={isDesktop ? "desktop" : "mobile"}
      >
        Frequently Asked Questions
      </Typography>
      <div className={faqs}>
        {data.map(({ category, questions }, key) => (
          <AccordionGroup
            heading={category}
            headingProps={{
              as: "h4",
            }}
            items={questions.map((question) => ({
              label: question.question,
              content: question.answer,
            }))}
            key={key}
          />
        ))}
      </div>
    </PageSection>
  );
}

export default Faq;
