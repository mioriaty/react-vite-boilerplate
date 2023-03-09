import { css, Theme } from '@emotion/react';

export const modalBody = css`
  min-height: 350px;
  width: 690px;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const item = css`
  padding: 0 10px;
  text-align: center;
  flex: 1;
`;

export const title = css`
  padding: 10px 0;
`;

export const steps = css`
  display: flex;
  padding: 15px 0;
  column-gap: 10px;

  .step-modal__dot-container:last-child .step-modal__dot-text {
    padding-right: 0px !important;
    &:after {
      display: none !important;
    }
  }
`;

export const dotContainer = css`
  display: flex;
  align-items: center;
  column-gap: 5px;
  overflow: hidden;
  position: relative;
`;

export const dot = css`
  margin: 0 3px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const dotText = ({ colors, fonts }: Theme) => css`
  position: relative;
  font-size: 16px;
  line-height: 1;
  padding-right: 16px;
  font-family: ${fonts.secondary};

  &:after {
    position: absolute;
    top: 16px;
    left: 100%;
    display: block;
    width: 9999px;
    height: 1px;
    background-color: ${colors.primary};
    content: '';
  }
`;

export const groupButton = css`
  debug: StepModal-groupButton;
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
