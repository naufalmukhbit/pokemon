/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";
import { availableTypeColors } from "../constants/typeColors";

interface ButtonProps {
  types: string[];
  children: ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  type typeNames = keyof typeof availableTypeColors;
  const { types, children, onClick } = props;

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
    <button
      css={css({
        background: color,
        height: "3rem",
        width: "100%",
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

export default Button;
