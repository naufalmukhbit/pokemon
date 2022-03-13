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
    id: number;
    name: string;
    owned: number;
  };
}

const PokemonListCard = ({ data }: PokemonListCardProps) => {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
  return (
    <Link to={`/pokemon/${data.name}`} css={styles.cardContainer}>
      <div css={styles.pokemonInfoContainer}>
        <img
          css={styles.pokemonImage}
          src={image}
          alt="pokemon-default-front"
          width={100}
          height={100}
        />
        <span>{capitalize(data.name)}</span>
      </div>
      <div css={[styles.dataContainer, styles.ownedData]}>
        <strong css={css({ fontWeight: 600 })}>OWNED</strong>
        <span>{data.owned}</span>
      </div>
    </Link>
  )
};

interface MyPokemonCardProps {
  data: {
    pokemonId: number;
    name: string;
    nickname: string;
  };
}

const MyPokemonCard = ({ data }: MyPokemonCardProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.pokemonId}.svg`
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
          src={image}
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
          <Button style={styles.yesButton} onClick={onDelete}>
            YES
          </Button>
          <Button style={styles.noButton} onClick={() => setDeleteConfirmation(false)}>
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
    padding: 20,
  }),
  dataContainer: css({
    background: "rgba(99, 99, 99, 0.2)",
    borderRadius: "0 0 14px 14px",
    border: "1px solid gba(99, 99, 99, 0.2)",
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
    alignItems: "center",
  }),
  yesButton: css({
    fontSize: 16,
    marginBottom: 10,
  }),
  noButton: css({
    background: "white",
    color: "black",
    fontSize: 16,
    border: "1px solid black",
  }),
};

export { PokemonListCard, MyPokemonCard };
