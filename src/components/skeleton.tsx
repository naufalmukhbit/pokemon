/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import screen from "../utils/breakpoints";
import Container from "./container";

const CardListSkeleton = () => {
  return (
    <Container>
      <div css={styles.titleSkeleton}>
        <SkeletonTheme width="100%" height="2em">
          <Skeleton />
        </SkeletonTheme>
      </div>
      <div css={styles.cardList}>
        {Array.from(Array(12).keys()).map((x, i) => (
          <div css={styles.cardSkeleton} key={i}>
            <SkeletonTheme width="100%" height={184} borderRadius={15}>
              <Skeleton />
            </SkeletonTheme>
          </div>
        ))}
      </div>
    </Container>
  );
};

const DetailSkeleton = () => {
  return (
    <Container>
      <div css={styles.titleSkeleton}>
        <SkeletonTheme width="100%" height="2em">
          <Skeleton />
        </SkeletonTheme>
      </div>
      <SkeletonTheme width={180} height={180}>
        <Skeleton style={{ marginBottom: 40, marginTop: 20 }} />
      </SkeletonTheme>
      <SkeletonTheme height="2rem">
        <Skeleton count={6} style={{ marginTop: "10px" }} />
      </SkeletonTheme>
    </Container>
  );
};

const AccordionSkeleton = () => (
  <SkeletonTheme width="100%" height="3rem">
    <Skeleton />
  </SkeletonTheme>
);

const CaptureBarSkeleton = () => (
  <div css={styles.captureBar}>
    <SkeletonTheme width="100%" height="5rem">
      <Skeleton />
    </SkeletonTheme>
  </div>
);

const styles = {
  titleSkeleton: css({
    margin: "auto",
    marginBlockStart: "0.67em",
    marginBlockEnd: "0.67em",
    marginBottom: 30,
    maxWidth: 250,
  }),
  cardList: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }),
  cardSkeleton: css({
    marginBottom: 16,
    [screen[0]]: {
      flex: "0 0 48%",
    },
    [screen[1]]: {
      flex: "0 0 32%",
    },
    [screen[2]]: {
      flex: "0 0 23.5%",
    },
  }),
  captureBar: css({
    position: "fixed",
    bottom: 0,
    width: "100%",
  }),
};

export { CardListSkeleton, DetailSkeleton, AccordionSkeleton, CaptureBarSkeleton };
