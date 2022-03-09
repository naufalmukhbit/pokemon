/** @jsxImportSource @emotion/react */
// import { pokemonData } from "../data/pokemonListData";
import { css } from "@emotion/react";
import Card from "../components/card";
import { useEffect, useState } from "react";
import { GET, POST } from "../utils/restAPI";
import { capitalize } from "../utils/capitalize";

interface PokemonData {
  name: string;
  sprite: string;
  owned: number;
}

const PokemonList = () => {
  const breakpoints = [320, 576, 768, 992, 1200];
  const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    GET("https://pokeapi.co/api/v2/pokemon/?limit=30").then(
      (res) => {
        res &&
          setPokemonData(
            res.res.results.map((item: { name: string; url: string }) => ({
              name: item.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.match(
                /(?<=\/pokemon\/)\d+/g
              )}.png`,
              owned: 0,
            }))
          );
      }
    );
  }, []);

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
      },
    });

    return (
      <div css={cardContainerStyle}>
        <Card data={data} fluid style={css({ margin: "10px" })} />
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
    <div>
      <div>
        <h1 css={css({
          [mq[1]]: {
            padding: "1rem 0"
          }
        })}>Pokémon List</h1>
        <div css={listStyle}>
          {pokemonData.map((data: PokemonData) => renderCard(data))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
