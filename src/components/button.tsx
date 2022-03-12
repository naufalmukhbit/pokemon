/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { ReactNode } from "react";
import { availableTypeColors } from "../constants/typeColors";
import screen from "../utils/breakpoints";

interface ButtonProps {
  children: ReactNode;
  style?: SerializedStyles | SerializedStyles[];
  onClick?: () => void;
}

const Button = ({ children, style, onClick }: ButtonProps) => {
  return (
    <button css={[styles.buttonStyle, style]} onClick={onClick}>
      {children}
    </button>
  );
};

interface ThemedButtonProps {
  types: string[];
  children: ReactNode;
  style?: SerializedStyles | SerializedStyles[];
  onClick?: () => void;
}

const ThemedButton = ({ types, children, style, onClick }: ThemedButtonProps) => {
  type typeNames = keyof typeof availableTypeColors;
  const availableTypes = [...Object.keys(availableTypeColors)] as const;
  type typeOfAvailableTypes = typeof availableTypes[number];
  const typeExist = (x: string): x is typeOfAvailableTypes =>
    availableTypes.includes(x);

  const color =
    types.length > 0
      ? typeExist(types[0])
        ? availableTypeColors[types[0] as typeNames]
        : availableTypeColors.unknown
      : availableTypeColors.unknown;

  return (
    <Button onClick={onClick} style={css({ background: color, [screen[1]]: {maxWidth: 300} })}>
      {children}
    </Button>
  );
};

const styles = {
  buttonStyle: css({
    background: "black",
    height: "3rem",
    width: "100%",
    border: "none",
    borderRadius: 10,
    color: "white",
    textShadow: "0px 2px 10px rgba(0,0,0,0.2)",
    fontSize: 20,
  }),
};

export { Button, ThemedButton };
