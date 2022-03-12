/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div css={styles.headerContainer}>
      <div css={styles.header}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            alt="Pokemon logo"
            width={82}
            height={30}
          />
        </Link>
        <Link
          to="/my-pokemon"
          css={[styles.link, pathname === "/my-pokemon" && styles.linkOnVisit]}
        >
          <span>My Pokémon</span>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  headerContainer: css({
    background: "#202020",
    position: "sticky",
    top: 0,
    zIndex: 9,
  }),
  header: css({
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    alignItems: "center",
  }),
  link: css({
    textDecoration: "none",
    color: "white",
  }),
  linkOnVisit: css({
    fontWeight: "bold",
  }),
};

export default Header;
