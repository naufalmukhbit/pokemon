/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET } from "../utils/restAPI";
import { capitalize } from "../utils/capitalize";
import { css } from "@emotion/react";

const PokemonDetail = () => {
  type pokemonType = {
    name: string;
    image: string;
    moves: string[];
    types: string[];
  }
  const params = useParams();
  const [pokemonData, setPokemonData] = useState<pokemonType>();

  useEffect(() => {
    GET("https://pokeapi.co/api/v2/pokemon/" + params.pokemonName).then(
      (res) => {
        res &&
          setPokemonData({
            name: res.res.name,
            image: res.res.sprites.front_default,
            moves: res.res.moves.map((move: any) => move.move.name),
            types: res.res.types.map((type: any) => type.type.name)
          });
      }
    );
  }, [params]);

  return pokemonData ? (
    <div>
      <h1>{capitalize(pokemonData.name)}</h1>
      <img src={pokemonData.image} alt="pokemon-default-front" />
      <div>
        <strong>Moves</strong>
        <div css={css({
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10
        })}>
          {pokemonData.moves.map((item) => (
            <span css={css({
              padding: "0.2rem 0.5rem",
              backgroundColor: "black",
              color: "white",
              borderRadius: 10,
            })}>{item}</span>
          ))}
        </div>
      </div>
      <div>
        <strong>Types</strong>
        <div css={css({
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10
        })}>
          {pokemonData.types.map((item) => (
            <span css={css({
              padding: "0.2rem 0.5rem",
              backgroundColor: "black",
              color: "white",
              borderRadius: 10,
            })}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1>Pokemon Not Found!</h1>
  )
}

export default PokemonDetail;