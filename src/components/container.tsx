/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";
import screen from "../utils/breakpoints";
import { CardListSkeleton, DetailSkeleton } from "./skeleton";

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

interface SkeletonProps {
  children: ReactNode;
  loading: boolean;
}

const ListSkeletonContainer = ({ children, loading }: SkeletonProps) => {
  return loading ? <CardListSkeleton /> : <Container>{children}</Container>;
};

const DetailSkeletonContainer = ({ children, loading }: SkeletonProps) => {
  return loading ? <DetailSkeleton /> : <div>{children}</div>;
};

export { ListSkeletonContainer, DetailSkeletonContainer };

export default Container;
