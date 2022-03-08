/** @jsxImportSource @emotion/react */
import { pokemonData } from "../data/pokemonListData";
import { css } from "@emotion/react";
import Card from "../components/card";

interface PokemonData {
  name: string;
  sprite: string;
  owned: number;
}

const PokemonList = () => {
  const breakpoints = [320, 576, 768, 992, 1200];
  const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);
  const renderCard = (data: PokemonData) => {
    const cardContainerStyle = css({
      display: "flex",
      flexDirection: "column",
      width: "100%",
      flexGrow: 1,
      flexShrink: 1,
      [mq[0]]: {
        flexBasis: "50%",
      },
      [mq[1]]: {
        flexBasis: "33.33%",
      }
    });

    return (
      <div css={cardContainerStyle}>
        <Card fluid style={css({margin: "10px"})}>
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
        </Card>
      </div>
    )
  }

  const containerStyle = css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  })

  return (
    <div css={containerStyle}>
      {pokemonData.map((data: PokemonData) => renderCard(data))}
    </div>
  )
}

export default PokemonList;