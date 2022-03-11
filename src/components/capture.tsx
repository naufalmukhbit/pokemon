/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import {ThemedButton} from "./button";
import { oddEvenRandomizer, randomNumber } from "../utils/randomizer";
import { savePokemon } from "../utils/myPokemon";
import Modal from "./modal";

interface CaptureType {
  pokemon: {
    name: string;
    image: string;
    moves: string[];
    types: string[];
  };
}

const CapturePokemon = ({ pokemon }: CaptureType) => {
  type captureType = "idle" | "capturing" | "success" | "failed";

  const [capturing, setCapturing] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<captureType>("idle");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (capturing) {
      let captureToken = randomNumber();
      setTimeout(() => {
        let status = oddEvenRandomizer(captureToken);
        setCaptureStatus(status ? "success" : "failed");
      }, 3500);
    }
  }, [capturing]);

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
            alert("Nickname already exists!");
          }
        } else {
          alert("Give your pokemon a nickname!");
        }
      } else {
        setCaptureStatus("idle");
        setCapturing(false);
      }
    }
  };

  return (
    <>
      <div
        css={css({
          position: "sticky",
          bottom: 0,
          width: "100%",
          background: "white",
        })}
      >
        <div
          css={css({
            padding: "1rem",
          })}
        >
          <ThemedButton types={pokemon.types} onClick={() => onCapture(true)}>
            CAPTURE
          </ThemedButton>
        </div>
      </div>
      <Modal visible={capturing}>
        <img
          css={css({ height: 100, width: 100 })}
          src={pokemon.image}
          alt="pokemon-default-front"
        />
        {captureStatus === "success"
          ? "Pokemon Captured!"
          : captureStatus === "failed"
          ? "Failed to catch Pokemon! :("
          : "Capturing..."}
        {captureStatus === "success" && (
          <input
            placeholder="Pokemon nickname..."
            onChange={(e) => setNickname(e.target.value)}
          />
        )}
        {(captureStatus === "success" || captureStatus === "failed") && (
          <ThemedButton types={pokemon.types} onClick={() => onCapture(false)}>
            CLOSE
          </ThemedButton>
        )}
      </Modal>
    </>
  );
};

export default CapturePokemon;
