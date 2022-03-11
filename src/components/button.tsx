/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";
import { availableTypeColors } from "../constants/typeColors";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  background?: string;
  width?: string | number;
  height?: string | number;
}

const Button = ({
  children,
  background,
  width,
  height,
  onClick,
}: ButtonProps) => {
  return (
    <button
      css={css({
        background: background ?? "black",
        height: height ?? "3rem",
        width: width ?? "100%",
        border: "none",
        borderRadius: 10,
        color: "white",
        textShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        fontSize: 20,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface ThemedButtonProps {
  types: string[];
  children: ReactNode;
  onClick?: () => void;
}

const ThemedButton = ({ types, children, onClick }: ThemedButtonProps) => {
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
    <Button onClick={onClick} background={color}>
      {children}
    </Button>
  );
};

export { Button, ThemedButton };
