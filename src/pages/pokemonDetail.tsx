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
import Accordion from "../components/accordion";
import screen from "../utils/breakpoints";

const PokemonDetail = () => {
  type pokemonType = {
    name: string;
    stats: {
      hp?: number;
      attack?: number;
      defense?: number;
      spAttack?: number;
      spDefense?: number;
      speed?: number;
    };
    image: string;
    baseXP: number;
    weight: number;
    height: number;
    ability: string[];
    heldItems: string[];
    moves: string[];
    types: string[];
  };
  const params = useParams();
  const [pokemonData, setPokemonData] = useState<pokemonType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `${capitalize(pokemonData?.name ?? params.pokemonName ?? "")} - Pokémon`
  })

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
    setLoading(true);
    GET(BASE_URL_POKEMON + params.pokemonName, {}).then((res) => {
      res &&
        setPokemonData({
          name: res.res.name,
          stats: getStat(res.res.stats),
          baseXP: res.res.base_experience,
          weight: res.res.weight / 10,
          height: res.res.height * 10,
          image: res.res.sprites.front_default,
          ability: res.res.abilities.map(
            (ability: any) => ability.ability.name
          ),
          heldItems: res.res.held_items.map((item: any) => item.item.name),
          moves: res.res.moves.map((move: any) => move.move.name),
          types: res.res.types.map((type: any) => type.type.name),
        });
      setLoading(false);
    });
  }, [params]);

  const renderSection = (title: string, data: string[]) => (
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
                  src={pokemonData.image}
                  width={200}
                  height={200}
                  alt="pokemon-default-front"
                  loading="lazy"
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
      {!loading && pokemonData && <CapturePokemon pokemon={pokemonData} />}
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
    marginTop: "1rem",
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
