/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MyPokemonCard } from "../components/card";
import { useEffect, useState } from "react";
import Container from "../components/container";

interface PokemonData {
  name: string;
  imageURL: string;
  nickname: string;
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
      flexGrow: 0,
      flexShrink: 0,
      [mq[0]]: {
        flexBasis: "50%",
      },
      [mq[1]]: {
        flexBasis: "33.33%",
      },
      [mq[1]]: {
        flexBasis: "25%",
      },
    });

    return (
      <div css={cardContainerStyle} key={data.name + index}>
        <MyPokemonCard data={data} />
      </div>
    );
  };

  const listStyle = css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
          : (
            <span css={css({
              width: "100%",
              textAlign: "center",
            })}>
              You don't have any pokemon!
            </span>
          )}
      </div>
    </Container>
  );
};

export default MyPokemon;
