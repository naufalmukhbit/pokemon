/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
    padding: "1rem",
  })
  return (
    <div css={headerContainerStyle}>
      <div css={headerStyle}>
        <span>Pokemon</span>
        <span>My Pokémon</span>
      </div>
    </div>
  )
}

export default Header;