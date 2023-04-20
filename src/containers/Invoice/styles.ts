import { css, Theme } from '@emotion/react';

export const container = ({ colors }: Theme) => css`
  padding: 30px;
  background-color: ${colors.light};
  border-radius: 6px;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const invoiceInfo = {
  container: css`
    @media (max-width: 768px) {
      .invoiceInfo-row {
        margin: 0 !important;
      }
      .invoiceInfo-left {
        width: 100%;
        flex: 0 0 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
      .invoiceInfo-right {
        width: 100%;
        flex: 0 0 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
    }
  `,
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

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
  `,
};

export const invoiceBilling = {
  container: css`
    @media (max-width: 768px) {
      .invoiceBilling-row {
        margin: 0 !important;
      }
      .invoiceBilling-left {
        width: 100%;
        flex: 0 0 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
      .invoiceBilling-right {
        width: 100%;
        flex: 0 0 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
    }
  `,
  label: ({ fonts }: Theme) => css`
    font-family: ${fonts.secondary};
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 32px;

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
  `,
};

export const invoiceProducts = {
  container: css`
    padding-top: 30px;

    .invoiceProducts-first-col {
      min-width: 300px;
    }

    @media (max-width: 768px) {
      overflow-x: auto;
      padding-top: 15px;
    }
  `,
  table: ({ colors }: Theme) => css`
    width: 100%;
    margin-bottom: 1rem;
    color: ${colors.gray9};
    vertical-align: top;
    caption-side: bottom;
    border-collapse: collapse;
    text-align: left;
    border: unset;

    > :not(caption) > * > * {
      padding: 10px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: ${colors.gray3};
    }

    > tbody {
      vertical-align: inherit;
    }

    > thead {
      vertical-align: bottom;
    }

    > :not(:last-child) > :last-child > * {
      border-bottom-color: ${colors.gray3};
    }
  `,
};

export const invoiceTax = {
  container: css`
    padding: 30px 0;

    @media (max-width: 768px) {
      padding: 15px 0;

      .invoiceTax-left {
        width: 100%;
        flex: 0 0 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
      .invoiceTax-right {
        width: 100%;
        flex: 0 0 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
        margin-top: 20px;
      }
    }
  `,
  totalContainer: ({ colors, fonts }: Theme) => css`
    max-width: 400px;
    padding: 24px 24px 16px;
    border-radius: 8px;
    border: 1px solid ${colors.gray3};
    margin-left: auto;

    label {
      font-weight: 500;
      font-family: ${fonts.primary};
    }
  `,
};
