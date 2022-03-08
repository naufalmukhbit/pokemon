/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  data: {
    name: string;
    sprite: string;
    owned: number;
  };
  style?: SerializedStyles;
  fluid?: boolean;
}

const Card = ({data, style, fluid}: CardProps) => {
  const cardStyle = css({
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(99, 99, 99, 0.2)",
    borderRadius: 15,
    padding: fluid ? 0 : "1rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    textDecoration: "none",
    color: "black"
  });

  return (
    <Link to={`/pokemon/${data.name}`} css={[cardStyle, style]}>
      <div css={css({
        display: "flex",
        flexDirection: "column",
        padding: "1rem"
      })}>
        <img src={data.sprite} alt="pokemon-default-front" />
        <span>{data.name}</span>
      </div>
      <div css={css({
        background: "rgba(99, 99, 99, 0.2)",
        borderRadius: "0 0 15px 15px",
        padding: "0.5rem 1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      })}>
        <span>OWNED</span>
        <span>{data.owned}</span>
      </div>
    </Link>
  )
}

export default Card;