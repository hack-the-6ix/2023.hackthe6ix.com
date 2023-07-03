import { ComponentWithAs, Typography, TypographyProps } from "@ht6/react-ui";
import { Fragment, ReactNode, useEffect, useState } from "react";
import cx from "classnames";
import {
  root,
  header,
  list,
  trigger,
  label,
  icon,
  iconLineH,
  iconLineV,
  content,
  text,
  closed,
} from "./AccordionGroup.module.scss";

export type AccordionGroupProps = ComponentWithAs<{
  headingProps?: Omit<TypographyProps, "textType" | "textColor">;
  heading: ReactNode;
  multiple?: boolean;
  items: {
    content: ReactNode;
    label: ReactNode;
  }[];
}>;

function AccordionGroup({
  as: Component = "div",
  headingProps = {},
  multiple,
  heading,
  items,
  ...props
}: AccordionGroupProps) {
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [isDesktop, setIsDesktop] = useState<Boolean>(false);

  const toggle = (idx: number) => {
    const _isOpen = isOpen ? [...isOpen] : [];
    _isOpen[idx] = !_isOpen[idx];
    setIsOpen(_isOpen);
  };

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
    <Component {...props} className={cx(root, props.className)}>
      <Typography
        {...headingProps}
        className={cx(header, headingProps.className)}
        textType="heading3"
        textColor="warning-400"
        textWeight="bold"
        displayType={isDesktop ? "desktop" : "mobile"}
      >
        {heading}
      </Typography>
      <dl className={list}>
        {items.map((item, key) => {
          const isOpened = isOpen[key];
          return (
            <Fragment key={key}>
              <dt>
                <Typography
                  onClick={() => toggle(key)}
                  textColor="neutral-50"
                  className={trigger}
                  textType="heading4"
                  textWeight="semi-bold"
                  as="button"
                >
                  <span className={label}>{item.label}</span>
                  <div className={cx(icon, !isOpened && closed)}>
                    <div className={iconLineH} />
                    <div className={iconLineV} />
                  </div>
                </Typography>
              </dt>
              <Typography
                textColor="neutral-200"
                textType="paragraph1"
                textWeight="regular"
                className={content}
                as="dd"
              >
                <p className={cx(text, !isOpened && closed)}>{item.content}</p>
              </Typography>
            </Fragment>
          );
        })}
      </dl>
    </Component>
  );
}

export default AccordionGroup;
