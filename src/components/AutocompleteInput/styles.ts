import { css, Theme } from '@emotion/react';

export const tooltipText = ({ colors }: Theme) => css`
  position: absolute;
  z-index: 9999999;
  background-color: ${colors.light};
  color: ${colors.gray8};
  padding: 4px 0;
  border-radius: 4px;
  font-size: 13px;
`;

export const placementTooltipText = (top: number, left: number, width: number, height: number) => {
  return css`
    top: ${top + height}px;
    left: ${left + width / 2}px;
    transform: translate(-50%, 5px);
    width: ${width}px;
  `;
};
