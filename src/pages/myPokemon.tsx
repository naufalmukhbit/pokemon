/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Card from "../components/card";
import { useEffect, useState } from "react";
import Container from "../components/container";

interface PokemonData {
  name: string;
  imageURL: string;
  nickname: number;
}

const MyPokemon = () => {
  const breakpoints = [320, 576, 768, 992, 1200];
  const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    let savedPokemon = localStorage.getItem("my-pokemon");
    setPokemonData(savedPokemon ? JSON.parse(savedPokemon) : []);
  }, []);

  const renderCard = (data: PokemonData, index: number) => {
    const cardContainerStyle = css({
      display: "flex",
      flexDirection: "column",
      width: "100%",
      flexGrow: 1,
      flexShrink: 1,
      [mq[0]]: {
        flexBasis: "100%",
      },
      [mq[1]]: {
        flexBasis: "50%",
      },
    });

    return (
      <div css={cardContainerStyle} key={data.name + index}>
        <Card
          data={{
            name: data.name,
            sprite: data.imageURL,
            owned: data.nickname,
          }}
          saved
          fluid
          style={css({ margin: "10px" })}
        />
      </div>
    );
  };

  const listStyle = css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  });

  return (
    <Container>
      <h1
        css={css({
          [mq[1]]: {
            padding: "1rem 0",
          },
        })}
      >
        My Pokémon
      </h1>
      <div css={listStyle}>
        {pokemonData.length > 0
          ? pokemonData.map((data: PokemonData, index: number) =>
              renderCard(data, index)
            )
          : "You don't have any pokemon!"}
      </div>
    </Container>
  );
};

export default MyPokemon;
