import { css, Theme } from '@emotion/react';

export const container = css`
  max-width: 1200px;
  padding: 15px;
  margin: 0 auto;
`;

export const invoiceInfo = {
  imageContainer: css`
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  label: ({ fonts }: Theme) => css`
    font-family: ${fonts.secondary};
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 50px;
  `,
};
