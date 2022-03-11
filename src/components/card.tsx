/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/capitalize";
import { releasePokemon } from "../utils/myPokemon";
import { Button } from "./button";
import Modal from "./modal";

interface PokemonListCardProps {
  data: {
    name: string;
    sprite: string;
    owned: number;
  };
}

const PokemonListCard = ({ data }: PokemonListCardProps) => (
  <Link to={`/pokemon/${data.name}`} css={styles.cardContainer}>
    <div css={styles.pokemonInfoContainer}>
      <img
        css={styles.pokemonImage}
        src={data.sprite}
        alt="pokemon-default-front"
      />
      <span>{capitalize(data.name)}</span>
    </div>
    <div css={[styles.dataContainer, styles.ownedData]}>
      <span>OWNED</span>
      <span>{data.owned}</span>
    </div>
  </Link>
);

interface MyPokemonCardProps {
  data: {
    name: string;
    imageURL: string;
    nickname: string;
  };
}

const MyPokemonCard = ({ data }: MyPokemonCardProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const onDelete = () => {
    releasePokemon(data.nickname);
    window.location?.reload();
  };

  return (
    <div css={styles.cardContainer}>
      <button
        css={styles.removeButton}
        onClick={() => setDeleteConfirmation(true)}
      >
        x
      </button>
      <div css={styles.pokemonInfoContainer}>
        <img
          css={styles.pokemonImage}
          src={data.imageURL}
          alt="pokemon-default-front"
        />
        <span>{capitalize(data.name)}</span>
      </div>
      <div css={[styles.dataContainer, styles.nicknameData]}>
        {data.nickname}
      </div>
      <Modal visible={deleteConfirmation}>
        Are you sure you want to release this Pokemon?
        <Button style={css({ background: "green" })} onClick={onDelete}>
          YES
        </Button>
        <Button
          style={css({ background: "red" })}
          onClick={() => setDeleteConfirmation(false)}
        >
          NO
        </Button>
      </Modal>
    </div>
  );
};

const styles = {
  cardContainer: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(99, 99, 99, 0.2)",
    borderRadius: 15,
    padding: 0,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    textDecoration: "none",
    color: "black",
    // margin: 10,
  }),
  pokemonInfoContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
  }),
  pokemonImage: css({
    maxWidth: 100,
    maxHeight: 100,
  }),
  dataContainer: css({
    background: "rgba(99, 99, 99, 0.2)",
    borderRadius: "0 0 15px 15px",
    padding: "0.5rem 1rem",
    display: "flex",
    flexDirection: "row",
  }),
  ownedData: css({
    justifyContent: "space-between",
  }),
  nicknameData: css({
    justifyContent: "center",
  }),
  removeButton: css({
    position: "absolute",
    top: 15,
    right: 15,
  }),
};

export { PokemonListCard, MyPokemonCard };
