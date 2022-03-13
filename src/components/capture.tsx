/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { Button, ThemedButton } from "./button";
import { oddEvenRandomizer, randomNumber } from "../utils/randomizer";
import { savePokemon } from "../utils/myPokemon";
import Modal from "./modal";
import screen from "../utils/breakpoints";
import { capitalize } from "../utils/capitalize";

interface CaptureType {
  pokemon: {
    id: number;
    name: string;
    moves: string[];
    types: string[];
  };
}

const CapturePokemon = ({ pokemon }: CaptureType) => {
  type captureType = "idle" | "capturing" | "success" | "failed";

  const [capturing, setCapturing] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<captureType>("idle");
  const [nickname, setNickname] = useState("");
  const [inputError, setInputError] = useState<string | undefined>();
  const [retyped, setRetyped] = useState(false);

  const image = require(`../assets/dream-world/${pokemon.id}.svg`)

  useEffect(() => {
    if (capturing) {
      let captureToken = randomNumber();
      setTimeout(() => {
        let status = oddEvenRandomizer(captureToken);
        setCaptureStatus(status ? "success" : "failed");
      }, 3500);
    }
  }, [capturing]);

  const alertInput = (alert: string) => {
    setInputError(alert);
    setRetyped(false);
  }

  const onCapture = (status: boolean) => {
    if (status) {
      setCaptureStatus("capturing");
      setCapturing(true);
    } else {
      if (captureStatus === "success") {
        if (nickname !== "") {
          if (savePokemon(pokemon, nickname)) {
            setNickname("");
            setCaptureStatus("idle");
            setCapturing(false);
          } else {
            alertInput("Nickname already exists!");
          }
        } else {
          alertInput("Nickname must be filled!");
        }
      } else {
        setCaptureStatus("idle");
        setCapturing(false);
      }
    }
  };

  return (
    <>
      <div css={styles.captureBar}>
        <div css={styles.captureButtonContainer}>
          <ThemedButton types={pokemon.types} onClick={() => onCapture(true)}>
            CATCH
          </ThemedButton>
        </div>
      </div>
      <Modal visible={capturing}>
        <img
          css={[
            styles.image,
            captureStatus === "failed" && styles.failedImage,
            captureStatus === "capturing" && styles.loadingImage,
          ]}
          src={image}
          alt="pokemon-default-front"
        />
        {captureStatus === "success" ? (
          <span css={styles.successStatus}>
            {`${capitalize(pokemon.name)} catched!`}
          </span>
        ) : captureStatus === "failed" ? (
          <span css={styles.failedStatus}>
            {`Failed to catch ${capitalize(pokemon.name)}...`}
          </span>
        ) : (
          `Catching ${capitalize(pokemon.name)}...`
        )}
        {captureStatus === "success" && (
          <div css={css({width: "100%", textAlign: "left"})}>
            <input
              placeholder="Give your Pokemon a nickname..."
              onChange={(e) => {
                setNickname(e.target.value);
                setRetyped(true);
              }}
              css={[styles.nicknameInput, inputError && !retyped && styles.nicknameInputFail]}
            />
            {inputError && !retyped && <small css={css({
              color: "red"
            })}>{inputError}</small>}
          </div>
        )}
        {(captureStatus === "success" || captureStatus === "failed") && (
          <Button onClick={() => onCapture(false)} style={styles.closeModal}>
            {captureStatus === "success" ? "SAVE" : "CLOSE"}
          </Button>
        )}
      </Modal>
    </>
  );
};
const blink = keyframes`
    0% {opacity: 0}
    100% {opacity: 1}
  `;

const styles = {
  captureBar: css({
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "white",
    boxShadow: "rgba(100, 100, 111, 0.2) 0 2px 8px 4px",
  }),
  captureButtonContainer: css({
    padding: "1rem",
    [screen[2]]: {
      maxWidth: 768,
      textAlign: "right",
      margin: "auto",
    },
  }),
  image: css({
    height: 100,
    width: 100,
  }),
  loadingImage: css({
    animation: `${blink} 1s ease infinite`,
  }),
  failedImage: css({
    filter: "grayscale(100%)",
  }),
  successStatus: css({
    fontSize: 20,
  }),
  failedStatus: css({
    fontSize: 18,
  }),
  nicknameInput: css({
    width: "100%",
    padding: "1rem 0.5rem",
    border: "1px solid #a0a0a0",
    borderRadius: 6,
    height: "2rem",
    boxSizing: "border-box",
  }),
  nicknameInputFail: css({
    border: "1px solid red",
  }),
  closeModal: css({
    fontSize: 14,
  }),
};

export default CapturePokemon;
