/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const Header = () => {
  const headerContainerStyle = css({
    position: "sticky",
    top: 0,
    background: "white",
  })

  const headerStyle = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "1rem"
  })

  const linkStyle = css({
    textDecoration: "none",
    color: "black"
  })
  return (
    <div css={headerContainerStyle}>
      <div css={headerStyle}>
        <Link to="/" css={linkStyle}>
          <span>Pokemon</span>
        </Link>
        <Link to="/my-pokemon" css={linkStyle}>
          <span>My Pokémon</span>
        </Link>
      </div>
    </div>
  )
}

export default Header;