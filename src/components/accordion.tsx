/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode, useState } from "react";

interface AccordionProps {
  title: string;
  children: string | ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((current) => !current);
  };

  return (
    <div css={styles.accordionContainer} className="accordion-container">
      <div css={styles.accordionTitle} onClick={toggle}>
        <strong>{title}</strong>
        <svg
          css={open && styles.accordionIconExpanded}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <div
        css={
          open
            ? styles.accordionContentExpanded
            : styles.accordionContentCollapsed
        }
      >
        {children ?? "No data"}
      </div>
    </div>
  );
};

const styles = {
  accordionContainer: css({
    // padding: "1rem",
    // cursor: "pointer",
  }),
  accordionTitle: css({
    padding: "1rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }),
  accordionContentCollapsed: css({
    padding: "0 1rem",
    maxHeight: 0,
    transition: "max-height 0.5s cubic-bezier(0, 1, 0, 1)",
    overflow: "hidden",
  }),
  accordionContentExpanded: css({
    padding: "0 1rem",
    maxHeight: 9999,
    transition: "max-height 1s ease-in-out",
    overflow: "hidden",
  }),
  accordionIconExpanded: css({
    transform: "rotateZ(180deg)",
  })
};

export default Accordion;
