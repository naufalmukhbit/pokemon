/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";
import screen from "../utils/breakpoints"

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      css={css({
        padding: "1rem",
        margin: "auto",
        [screen[2]]: {
          maxWidth: 768,
        },
      })}
    >
      {children}
    </div>
  );
};

export default Container;
