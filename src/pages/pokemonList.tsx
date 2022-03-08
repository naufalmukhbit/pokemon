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
        <Card data={data} fluid style={css({margin: "10px"})} />
      </div>
    )
  }

  const listStyle = css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  })

  return (
    <div>
      <h1>Pokémon List</h1>
      <div css={listStyle}>
        {pokemonData.map((data: PokemonData) => renderCard(data))}
      </div>
    </div>
  )
}

export default PokemonList;