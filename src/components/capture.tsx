/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Button from "../components/themedButton";
import { oddEvenRandomizer, randomNumber } from "../utils/randomizer";

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

  useEffect(() => {
    if (capturing) {
      let captureToken = randomNumber();
      setTimeout(() => {
        let status = oddEvenRandomizer(captureToken);
        setCaptureStatus(status ? "success" : "failed");
      }, 5000);
    }
  }, [capturing]);

  const onCapture = (status: boolean) => {
    if (status) {
      setCaptureStatus("capturing");
      setCapturing(true);
    } else {
      setCaptureStatus("idle");
      setCapturing(false);
    }
  }

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
          <Button types={pokemon.types} onClick={() => onCapture(true)}>
            CAPTURE
          </Button>
        </div>
      </div>
      <div
        css={css({
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: capturing ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        })}
      >
        <div
          css={css({
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: 10,
            height: "100%",
            width: "100%",
            maxHeight: 200,
            maxWidth: 480,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          })}
        >
          <img
            css={css({height: 100, width: 100})}
            src={pokemon.image}
            alt="pokemon-default-front"
          />
          {captureStatus === "success"
            ? "Pokemon Captured!"
            : captureStatus === "failed"
            ? "Failed to catch Pokemon! :("
            : "Capturing..."}
          {(captureStatus === "success" || captureStatus === "failed") && (
            <Button types={pokemon.types} onClick={() => onCapture(false)}>
              CLOSE
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CapturePokemon;
