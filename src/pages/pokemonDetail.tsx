/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET } from "../services/restAPI";
import { capitalize } from "../utils/capitalize";
import { css } from "@emotion/react";
import Container, { DetailSkeletonContainer } from "../components/container";
import CapturePokemon from "../components/capture";
import { BASE_URL_POKEMON } from "../services/apiConfig";
import { DetailSkeleton } from "../components/skeleton";

const PokemonDetail = () => {
  type pokemonType = {
    name: string;
    image: string;
    moves: string[];
    types: string[];
  };
  const params = useParams();
  const [pokemonData, setPokemonData] = useState<pokemonType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GET(BASE_URL_POKEMON + params.pokemonName, {}).then((res) => {
      res &&
        setPokemonData({
          name: res.res.name,
          image: res.res.sprites.front_default,
          moves: res.res.moves.map((move: any) => move.move.name),
          types: res.res.types.map((type: any) => type.type.name),
        });
      setLoading(false);
    });
  }, [params]);

  return (
    <div>
      <DetailSkeletonContainer loading={loading}>
        {pokemonData ? (
          <>
            <h1>{capitalize(pokemonData.name)}</h1>
            <img
              src={pokemonData.image}
              width={200}
              height={200}
              alt="pokemon-default-front"
              loading="lazy"
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
          </>
        ) : (
          <h1>Pokemon Not Found!</h1>
        )}
      </DetailSkeletonContainer>
      {!loading && pokemonData && <CapturePokemon pokemon={pokemonData} /> }
    </div>
  );
};

const styles = {
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
