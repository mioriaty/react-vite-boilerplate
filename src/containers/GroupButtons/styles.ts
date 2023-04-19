import { css } from '@emotion/react';

export const buttonContainer = css`
  position: sticky;
  top: 0;
  z-index: 1020;
  padding-top: 20px;

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
