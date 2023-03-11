import { css, Theme } from '@emotion/react';

export const modalBody = css`
  min-height: 480px;
  width: 650px;
`;

export const modalChild = css`
  height: 100%;
  padding: 40px;
`;

export const container = ({ fonts }: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  font-family: ${fonts.secondary};
`;

export const item = css`
  padding: 0 10px;
  text-align: center;
  flex: 1;
`;

export const title = css`
  padding: 20px 0;
  font-size: 28px;
  font-weight: 500;
`;

export const steps = css`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  min-height: 40px;

  .step-modal__dot-container:last-child .step-modal__dot-text {
    padding-right: 0px !important;
    &:after {
      display: none !important;
    }
  }

  .step-modal__dot-container:not(:first-of-type) {
    padding-left: 20px;
  }
`;

export const dotContainer = ({ colors }: Theme) => css`
  display: flex;
  align-items: center;
  column-gap: 10px;
  position: relative;
  background-color: ${colors.light};
`;

export const dot =
  (active: boolean) =>
  ({ colors }: Theme) =>
    css`
      width: 40px;
      height: 40px;
      border-radius: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      line-height: 1;
      border: 2px solid ${active ? colors.secondary : colors.gray2};
      color: ${active ? colors.secondary : colors.gray5};
      background-color: ${active ? colors.light : colors.gray2};
    `;

export const dotText = ({ colors, fonts }: Theme) => css`
  padding-right: 20px;
  font-family: ${fonts.secondary};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 9999px;
    height: 1px;
    background-color: ${colors.secondary};

    top: 50%;
    left: 100%;
    transform: translateY(-50%);
  }
`;

export const groupButton = css`
  display: flex;
  margin-top: 20px;
  column-gap: 10px;
`;

export const nextButton = ({ colors }: Theme) => css`
  font-weight: 500;
  user-select: none;
  background-color: ${colors.primary};
  border-radius: 4px;
`;

export const prevButton = ({ colors }: Theme) => css`
  font-weight: 500;
  user-select: none;
  background-color: ${colors.gray2};
  border-radius: 4px;
  color: ${colors.gray8};
`;
