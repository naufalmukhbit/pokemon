/** @jsxImportSource @emotion/react */

// Loading spinner from https://loading.io/css/
import { css, keyframes } from "@emotion/react";
export const Loading = () => {
  const animation = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `
  
  const style = css`
    color: official;
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
  `

  const divStyle = css`
    transform-origin: 5px 5px;
    animation: ${animation} 1.2s linear infinite;
    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: -4px;
      left: 4px;
      width: 1px;
      height: 4px;
      border-radius: 20%;
      background: #000;
    }
  `
  const spinner = [
    css`transform: rotate(0deg);
    animation-delay: -1.1s;`,
    css`transform: rotate(30deg);
    animation-delay: -1s;`,
    css`transform: rotate(60deg);
    animation-delay: -0.9s;`,
    css`transform: rotate(90deg);
    animation-delay: -0.8s;`,
    css`transform: rotate(120deg);
    animation-delay: -0.7s;`,
    css`transform: rotate(150deg);
    animation-delay: -0.6s;`,
    css`transform: rotate(180deg);
    animation-delay: -0.5s;`,
    css`transform: rotate(210deg);
    animation-delay: -0.4s;`,
    css`transform: rotate(240deg);
    animation-delay: -0.3s;`,
    css`transform: rotate(270deg);
    animation-delay: -0.2s;`,
    css`transform: rotate(300deg);
    animation-delay: -0.1s;`,
    css`transform: rotate(330deg);
    animation-delay: 0s;`,
  ]

  return (
    <div css={style}>
      {spinner.map((x, i) => (
        <div key={i} css={[divStyle, x]} />
      ))}
    </div>
  );
};
