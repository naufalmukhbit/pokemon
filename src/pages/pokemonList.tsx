/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PokemonListCard } from "../components/card";
import { useEffect, useState } from "react";
import { GET } from "../services/restAPI";
import Container from "../components/container";
import { BASE_URL_POKEMON, BASE_URL_SPRITES } from "../services/apiConfig";
import { Button } from "../components/button";

interface PokemonData {
  name: string;
  sprite: string;
  owned: number;
}

const PokemonList = () => {
  const ownedPokemons = localStorage.getItem("my-owned");
  const owned = ownedPokemons ? JSON.parse(ownedPokemons) : {};

  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [nextPokemonList, setNextPokemonList] = useState<string | null>("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500 ? true : false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mapResToState = (item: { name: string; url: string }) => ({
    name: item.name,
    sprite: BASE_URL_SPRITES + `${item.url.match(/(?<=\/pokemon\/)\d+/g)}.png`,
    owned: owned[item.name] ?? 0,
  });

  useEffect(() => {
    GET(BASE_URL_POKEMON, { limit: 36 }).then((res) => {
      if (res) {
        setNextPokemonList(res.res.next);
        setPokemonData(res.res.results.map(mapResToState));
      }
    });
  }, []);

  const loadMore = () => {
    setLoading(true);
    GET(nextPokemonList!, {}).then((res) => {
      if (res) {
        setNextPokemonList(res.res.next);
        setPokemonData((cur: PokemonData[]) => [
          ...cur,
          ...res.res.results.map(mapResToState),
        ]);
      }
      setLoading(false);
    });
  };

  const renderCard = (data: PokemonData, index: number) => (
    <div css={styles.cardContainer} key={data.name + index}>
      <PokemonListCard data={data} />
    </div>
  );

  const scrollToTop = () => {
    showBackToTop && window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
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
          <span>Loading...</span>
        ))}
      <div css={css({height: "2rem"})} />
      <Button
        style={[styles.backToTopButton, showBackToTop ? styles.backToTopVisible : styles.backToTopInvisible]}
        onClick={scrollToTop}
      >
        Top
      </Button>
    </Container>
  );
};

const breakpoints = [320, 576, 768, 992, 1200];
const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);
const styles = {
  title: css({
    marginBottom: 30,
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
    flexGrow: 0,
    flexShrink: 0,
    [mq[0]]: {
      flexBasis: "48%",
    },
    [mq[1]]: {
      flexBasis: "32%",
    },
    [mq[2]]: {
      flexBasis: "23.5%",
    },
  }),
  loadMoreButton: css({
    background: "white",
    color: "black",
    fontSize: 14,
    height: "2.6rem",
    border: "1px solid rgba(99, 99, 99, 0.2)",
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
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  }),
  backToTopVisible: css({
    visibility: "initial",
    opacity: 1,
  }),
  backToTopInvisible: css({
    visibility: "hidden",
    opacity: 0,
  })
};

export default PokemonList;
