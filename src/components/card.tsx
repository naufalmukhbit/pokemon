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
        width={100}
        height={100}
      />
      <span>{capitalize(data.name)}</span>
    </div>
    <div css={[styles.dataContainer, styles.ownedData]}>
      <strong>OWNED</strong>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
      <div css={styles.pokemonInfoContainer}>
        <img
          css={styles.pokemonImage}
          src={data.imageURL}
          alt="pokemon-default-front"
          width={100}
          height={100}
        />
        <span css={css({ fontWeight: "bold" })}>{data.nickname}</span>
      </div>
      <div css={[styles.dataContainer, styles.nicknameData]}>
        {capitalize(data.name)}
      </div>
      <Modal visible={deleteConfirmation}>
        Are you sure you want to release this Pokemon? You can't undo this
        action.
        <div css={css({ width: "100%" })}>
          <Button
            style={css({ background: "green", fontSize: 16, marginBottom: 10 })}
            onClick={onDelete}
          >
            YES
          </Button>
          <Button
            style={css({ background: "red", fontSize: 16 })}
            onClick={() => setDeleteConfirmation(false)}
          >
            NO
          </Button>
        </div>
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
    top: 10,
    right: 10,
    height: 28,
    width: 28,
    padding: 0,
    borderRadius: 999,
    border: "1px solid #d0d0d0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }),
};

export { PokemonListCard, MyPokemonCard };
