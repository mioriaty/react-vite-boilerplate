import { css, keyframes } from '@emotion/react';

export const container = (placementTop: boolean) => {
  if (placementTop) {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      height: 3px;
      overflow: hidden;
    `;
  }
  return css`
    height: 3px;
    overflow: hidden;
  `;
};

export const bar = css`
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  will-change: transform;
  transition: transform 300ms ease;
`;

export const loaderKeyframe = keyframes`
 0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-10%);
  }
`;

export const animation = css`
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-name: ${loaderKeyframe};
`;
