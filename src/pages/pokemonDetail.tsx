/** @jsxImportSource @emotion/react */
import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "../utils/capitalize";
import { css } from "@emotion/react";
import { DetailSkeletonContainer } from "../components/container";
import screen from "../utils/breakpoints";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "../services/queries";
import { AccordionSkeleton, CaptureBarSkeleton } from "../components/skeleton";

const Accordion = lazy(() => import("../components/accordion"));
const CapturePokemon = lazy(() => import("../components/capture"));

const PokemonDetail = () => {
  type pokemonType = {
    id: number;
    name: string;
    stats: {
      hp?: number;
      attack?: number;
      defense?: number;
      spAttack?: number;
      spDefense?: number;
      speed?: number;
    };
    baseXP: number;
    weight: number;
    height: number;
    ability: string[];
    heldItems: string[];
    moves: string[];
    types: string[];
  };
  const params = useParams();
  const [image, setImage] = useState<any>(require("../assets/unknown.png"));
  const [pokemonData, setPokemonData] = useState<pokemonType>();
  const { loading, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name: params.pokemonName,
    },
  });

  useEffect(() => {
    document.title = `${capitalize(
      pokemonData?.name ?? params.pokemonName ?? ""
    )} - Pokémon`;
  });

  useEffect(() => {
    data?.pokemon?.id &&
      data.pokemon.id !== "" &&
      setImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.pokemon.id}.svg`);
  }, [data]);

  const getStat = (stat: any[]) => {
    return {
      hp: stat.find((item) => item.stat.name === "hp")?.base_stat ?? undefined,
      attack:
        stat.find((item) => item.stat.name === "attack")?.base_stat ??
        undefined,
      defense:
        stat.find((item) => item.stat.name === "defense")?.base_stat ??
        undefined,
      spAttack:
        stat.find((item) => item.stat.name === "special-attack")?.base_stat ??
        undefined,
      spDefense:
        stat.find((item) => item.stat.name === "special-defense")?.base_stat ??
        undefined,
      speed:
        stat.find((item) => item.stat.name === "speed")?.base_stat ?? undefined,
    };
  };

  useEffect(() => {
    if (!loading && data?.pokemon) {
      setPokemonData({
        id: data.pokemon.id,
        name: data.pokemon.name,
        stats: getStat(data.pokemon.stats),
        baseXP: data.pokemon.base_experience,
        weight: data.pokemon.weight / 10,
        height: data.pokemon.height * 10,
        ability: data.pokemon.abilities.map(
          (ability: any) => ability.ability.name
        ),
        heldItems: data.pokemon.held_items.map((item: any) => item.item.name),
        moves: data.pokemon.moves.map((move: any) => move.move.name),
        types: data.pokemon.types.map((type: any) => type.type.name),
      });
    }
  }, [loading, data]);

  const renderSection = (title: string, data: string[]) => (
    <Suspense fallback={<AccordionSkeleton />}>
      <Accordion title={title}>
        <div css={styles.pokemonInfoList}>
          {data.map((item, index) => (
            <span css={styles.pokemonInfoName} key={item + index}>
              {item}
            </span>
          ))}
          {(!data || data.length === 0) && (
            <span css={css({ color: "lightgray" })}>No data</span>
          )}
        </div>
      </Accordion>
    </Suspense>
  );

  return (
    <div>
      <DetailSkeletonContainer loading={loading}>
        {pokemonData ? (
          <div css={styles.container}>
            <div css={styles.pokemonCardContainer}>
              <div>
                <h1 css={styles.title}>{capitalize(pokemonData.name)}</h1>
                <img
                  src={image}
                  width={200}
                  height={200}
                  alt="pokemon-default-front"
                />
                <div css={styles.pokemonStatRow}>
                  <div css={styles.pokemonStatCell}>
                    <small>HP</small>
                    <span>{pokemonData.stats.hp ?? "?"}</span>
                  </div>
                  <div css={styles.pokemonStatCell}>
                    <small>ATTACK</small>
                    <span>{pokemonData.stats.attack ?? "?"}</span>
                  </div>
                  <div css={styles.pokemonStatCell}>
                    <small>DEFENSE</small>
                    <span>{pokemonData.stats.defense ?? "?"}</span>
                  </div>
                </div>
                <div css={styles.pokemonStatRow}>
                  <div css={styles.pokemonStatCell}>
                    <small>SPEED</small>
                    <span>{pokemonData.stats.speed ?? "?"}</span>
                  </div>
                  <div css={styles.pokemonStatCell}>
                    <small>SP-ATTACK</small>
                    <span>{pokemonData.stats.spAttack ?? "?"}</span>
                  </div>
                  <div css={styles.pokemonStatCell}>
                    <small>SP-DEFENSE</small>
                    <span>{pokemonData.stats.spDefense ?? "?"}</span>
                  </div>
                </div>
              </div>
              <table css={styles.pokemonPropsTable}>
                <tbody>
                  <tr>
                    <td css={styles.pokemonPropsName}>Base XP</td>
                    <td css={styles.pokemonPropsValue}>{pokemonData.baseXP}</td>
                  </tr>
                  <tr>
                    <td css={styles.pokemonPropsName}>Weight</td>
                    <td css={styles.pokemonPropsValue}>
                      {pokemonData.weight} kg
                    </td>
                  </tr>
                  <tr>
                    <td css={styles.pokemonPropsName}>Height</td>
                    <td css={styles.pokemonPropsValue}>
                      {pokemonData.height} cm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div css={styles.pokemonInfoContainer}>
              {renderSection("Ability", pokemonData.ability)}
              {renderSection("Held Items", pokemonData.heldItems)}
              {renderSection("Moves", pokemonData.moves)}
              {renderSection("Types", pokemonData.types)}
            </div>
          </div>
        ) : (
          <h1>Pokemon Not Found!</h1>
        )}
      </DetailSkeletonContainer>
      {!loading && pokemonData && (
        <Suspense fallback={<CaptureBarSkeleton />}>
          <CapturePokemon pokemon={pokemonData} />
        </Suspense>
      )}
    </div>
  );
};

const styles = {
  container: css({
    marginBottom: "6rem",
    maxWidth: 768,
    marginLeft: "auto",
    marginRight: "auto",
  }),
  title: css({
    fontWeight: 500,
  }),
  pokemonCardContainer: css({
    border: "1px solid #a0a0a0",
    borderRadius: 6,
    [screen[0]]: {
      margin: "2rem",
    },
    [screen[1]]: {
      margin: "2rem auto",
      maxWidth: 400,
    },
  }),
  pokemonPropsTable: css({
    background: "#f0f0f0",
    width: "100%",
    padding: "1rem 2rem",
    borderRadius: "0 0 6px 6px",
    marginTop: 30,
  }),
  pokemonPropsName: css({
    textAlign: "left",
    fontWeight: "bold",
  }),
  pokemonPropsValue: css({
    textAlign: "right",
  }),
  pokemonInfoContainer: css({
    borderTop: "1px solid #d0d0d0",
    ".accordion-container": {
      borderBottom: "1px solid #d0d0d0",
    },
  }),
  pokemonInfoList: css({
    marginBottom: "1rem",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "10px",
  }),
  pokemonInfoName: css({
    padding: "0.2rem 0.5rem",
    backgroundColor: "black",
    color: "white",
    borderRadius: "10px",
  }),
  pokemonStatRow: css({
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    gap: 10,
    width: "100%",
    justifyContent: "space-around",
  }),
  pokemonStatCell: css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    small: {
      fontSize: 10,
    },
  }),
};

export default PokemonDetail;
