/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";

import { PokemonListCard } from "../components/card";
import { ListSkeletonContainer } from "../components/container";
import { Button } from "../components/button";
import { Loading } from "../components/loading";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../services/queries";

interface PokemonData {
  id: number;
  name: string;
  owned: number;
}

const PokemonList = () => {
  document.title = "Pokémon List";
  
  const [pageLoading, setPageLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [nextPokemonList, setNextPokemonList] = useState<string | null>("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [apiVariable, setApiVariable] = useState({
    limit: 20,
    offset: 0,
  });

  const { loading, data } = useQuery(GET_POKEMON, {
    variables: apiVariable,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500 ? true : false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mapResToState = useCallback(((item: { id:number, name: string; url: string }) => {
    const ownedPokemons = localStorage.getItem("my-owned");
    const owned = ownedPokemons ? JSON.parse(ownedPokemons) : {};

    return {
      id: item.id,
      name: item.name,
      owned: owned[item.name] ?? 0,
    }
  }), []);

  useEffect(() => {
    if (!loading && data?.pokemons) {
      setPokemonData((cur) => [
        ...cur,
        ...data.pokemons.results.map(mapResToState)
      ]);
      setNextPokemonList(data.pokemons.next);
      setPageLoading(false);
    }
  }, [loading, data, mapResToState]);

  const loadMore = () => {
    if (data?.pokemons) {
      if (nextPokemonList) {
        let nextOffset = nextPokemonList && nextPokemonList.match(/(?<=offset=)\d+/g)
        setApiVariable({
          limit: 20,
          offset: parseInt(nextOffset ? nextOffset[0] : "0"),
        });
      }
    }
  };

  const renderCard = (data: PokemonData, index: number) => (
    <div css={styles.cardContainer} key={data.name + index}>
      <PokemonListCard data={data} />
    </div>
  );

  const scrollToTop = () => {
    showBackToTop &&
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  };

  return (
    <ListSkeletonContainer loading={pageLoading}>
      <h1 css={styles.title}>Pokémon List</h1>
      <div css={styles.list}>
        {pokemonData.map((data: PokemonData, index: number) =>
          renderCard(data, index)
        )}
      </div>
      {nextPokemonList &&
        nextPokemonList !== null &&
        (!loading ? (
          <Button style={styles.loadMoreButton} onClick={loadMore}>
            Load more
          </Button>
        ) : (
          <span css={styles.loadingSpinner}>
            <Loading />
            Loading...
          </span>
        ))}
      <div css={css({ height: "2rem" })} />
      <Button
        style={[
          styles.backToTopButton,
          showBackToTop ? styles.backToTopVisible : styles.backToTopInvisible,
        ]}
        onClick={scrollToTop}
      >
        {/* Chevron icon from Bootstrap */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-chevron-up"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
          />
        </svg>
      </Button>
    </ListSkeletonContainer>
  );
};

const breakpoints = [320, 576, 768, 992, 1200];
const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);
const styles = {
  title: css({
    marginBottom: 30,
    fontWeight: 500,
    [mq[1]]: {
      padding: "1rem 0",
    },
  }),
  list: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }),
  cardContainer: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 16,
    [mq[0]]: {
      flex: "0 0 48%",
    },
    [mq[1]]: {
      flex: "0 0 32%",
    },
    [mq[2]]: {
      flex: "0 0 23.5%",
    },
  }),
  loadMoreButton: css({
    background: "white",
    color: "black",
    fontSize: 14,
    height: "2.6rem",
    border: "1px solid rgba(99, 99, 99, 0.2)",
  }),
  loadingSpinner: css({
    padding: "0.5rem",
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  }),
  backToTopButton: css({
    position: "sticky",
    bottom: "1rem",
    width: "4rem",
    height: "4rem",
    borderRadius: 999,
    float: "right",
    transition: "visibility 0.1s, opacity 0.1s linear",
    background: "white",
    color: "black",
    border: "1px solid rgba(99, 99, 99, 0.2)",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  }),
  backToTopVisible: css({
    visibility: "initial",
    opacity: 1,
  }),
  backToTopInvisible: css({
    visibility: "hidden",
    opacity: 0,
  }),
};

export default PokemonList;
