/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PokemonListCard } from "../components/card";
import { useEffect, useState } from "react";
import { GET } from "../utils/restAPI";
import Container from "../components/container";

interface PokemonData {
  name: string;
  sprite: string;
  owned: number;
}

const PokemonList = () => {
  const breakpoints = [320, 576, 768, 992, 1200];
  const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);

  const ownedPokemons = localStorage.getItem("my-owned");
  const owned = ownedPokemons ? JSON.parse(ownedPokemons) : {};

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    GET("https://pokeapi.co/api/v2/pokemon/?limit=36").then((res) => {
      res &&
        setPokemonData(
          res.res.results.map((item: { name: string; url: string }) => {
            return {
              name: item.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.match(
                /(?<=\/pokemon\/)\d+/g
              )}.png`,
              owned: owned[item.name] ?? 0,
            };
          })
        );
    });
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
      [mq[2]]: {
        flexBasis: "25%",
      },
    });

    return (
      <div css={cardContainerStyle} key={data.name + index}>
        <PokemonListCard data={data} />
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
        Pokémon List
      </h1>
      <div css={listStyle}>
        {pokemonData.map((data: PokemonData, index: number) =>
          renderCard(data, index)
        )}
      </div>
    </Container>
  );
};

export default PokemonList;
