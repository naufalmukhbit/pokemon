/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const Header = () => {
  const headerContainerStyle = css({
    background: "#202020",
    position: "sticky",
    top: 0,
    zIndex: 9,
  });
  
  const headerStyle = css({
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    alignItems: "center",
  });
  
  const headerLogoStyle = css({
    height: 30,
  })
  
  const linkStyle = css({
    textDecoration: "none",
    color: "white",
  });
  return (
    <div css={headerContainerStyle}>
      <div css={headerStyle}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            alt="Pokemon logo"
            css={headerLogoStyle}
          />
        </Link>
        <Link to="/my-pokemon" css={linkStyle}>
          <span>My Pokémon</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
