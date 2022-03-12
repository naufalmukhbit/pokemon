/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MyPokemonCard } from "../components/card";
import { useEffect, useState } from "react";
import { ListSkeletonContainer } from "../components/container";
import screen from "../utils/breakpoints";

interface PokemonData {
  name: string;
  imageURL: string;
  nickname: string;
}

const MyPokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let savedPokemon = localStorage.getItem("my-pokemon");
    setPokemonData(savedPokemon ? JSON.parse(savedPokemon) : []);
    setLoading(false);
  }, []);

  const renderCard = (data: PokemonData, index: number) => (
    <div css={styles.cardContainer} key={data.name + index}>
      <MyPokemonCard data={data} />
    </div>
  );

  return (
    <ListSkeletonContainer loading={loading}>
      <h1 css={styles.title}>My Pokémon</h1>
      <div css={styles.list}>
        {pokemonData.length > 0 ? (
          pokemonData.map((data: PokemonData, index: number) =>
            renderCard(data, index)
          )
        ) : (
          <span css={styles.noPokemon}>You don't have any pokemon!</span>
        )}
      </div>
    </ListSkeletonContainer>
  );
};

const styles = {
  title: css({
    [screen[1]]: {
      padding: "1rem 0",
    },
  }),
  list: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }),
  noPokemon: css({
    width: "100%",
    textAlign: "center",
  }),
  cardContainer: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 16,
    [screen[0]]: {
      flex: "0 0 48%",
    },
    [screen[1]]: {
      flex: "0 0 32%",
    },
    [screen[2]]: {
      flex: "0 0 23.5%",
    },
  }),
};

export default MyPokemon;
