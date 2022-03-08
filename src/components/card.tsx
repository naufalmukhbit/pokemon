/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  style?: SerializedStyles;
  fluid?: boolean;
}

const Card = ({children, style, fluid}: CardProps) => {
  const cardStyle = css({
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(99, 99, 99, 0.2)",
    borderRadius: 15,
    padding: fluid ? 0 : "1rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
  });

  return (
    <div css={[cardStyle, style]}>
      {children}
    </div>
  )
}

export default Card;