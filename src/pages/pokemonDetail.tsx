/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET } from "../utils/restAPI";
import { capitalize } from "../utils/capitalize";
import { css } from "@emotion/react";
import Container from "../components/container";
import Button from "../components/themedButton";
import CapturePokemon from "../components/capture";

const PokemonDetail = () => {
  type pokemonType = {
    name: string;
    image: string;
    moves: string[];
    types: string[];
  };
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
            types: res.res.types.map((type: any) => type.type.name),
          });
      }
    );
  }, [params]);

  return pokemonData ? (
    <div>
      <Container>
        <h1>{capitalize(pokemonData.name)}</h1>
        <img
          css={styles.pokemonImage}
          src={pokemonData.image}
          alt="pokemon-default-front"
        />
        <div css={styles.pokemonInfoSection}>
          <strong>Moves</strong>
          <div css={styles.pokemonInfoList}>
            {pokemonData.moves.map((item, index) => (
              <span css={styles.pokemonInfoName} key={item + index}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div css={styles.pokemonInfoSection}>
          <strong>Types</strong>
          <div css={styles.pokemonInfoList}>
            {pokemonData.types.map((item, index) => (
              <span css={styles.pokemonInfoName} key={item + index}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
      <CapturePokemon pokemon={pokemonData} />
    </div>
  ) : (
    <h1>Pokemon Not Found!</h1>
  );
};

const styles = {
  pokemonImage: css`
    height: 200px;
    width: 200px;
  `,
  pokemonInfoSection: css`
    margin: 1rem 0 2rem;
  `,
  pokemonInfoList: css`
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 10px;
  `,
  pokemonInfoName: css`
    padding: 0.2rem 0.5rem;
    background-color: black;
    color: white;
    border-radius: 10px;
  `,
};

export default PokemonDetail;
