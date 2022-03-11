/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  visible: boolean;
}

const Modal = ({ children, visible }: ModalProps) => {
  return (
    <div
        css={css({
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: visible ? "flex" : "none",
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
          {children}
        </div>
      </div>
  );
};

export default Modal;
