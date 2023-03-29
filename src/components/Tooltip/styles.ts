import { css, Theme } from '@emotion/react';

type Placement = 'top' | 'right' | 'bottom' | 'left';

export const container = css`
  position: relative;
  display: inline-block;
`;

export const tooltip = ({ colors }: Theme) => css`
  white-space: nowrap;
  &:after {
    content: attr(data-tooltip);
    position: absolute;
    z-index: 999;
    background-color: ${colors.gray8};
    color: ${colors.light};
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 13px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    pointer-events: none;
  }
  &:hover {
    &:after {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const placementTooltip = (placement: Placement) => {
  switch (placement) {
    case 'bottom': {
      return css`
        &:after {
          left: 50%;
          bottom: -5px;
          transform: translate(-50%, 100%);
        }
      `;
    }
    case 'top': {
      return css`
        &:after {
          top: -5px;
          left: 50%;
          transform: translate(-50%, -100%);
        }
      `;
    }
    case 'left': {
      return css`
        &:after {
          top: 50%;
          left: -5px;
          transform: translate(-100%, -50%);
        }
      `;
    }
    case 'right': {
      return css`
        &:after {
          top: 50%;
          right: -5px;
          transform: translate(100%, -50%);
        }
      `;
    }
  }
};

export const tooltipText = ({ colors }: Theme) => css`
  position: absolute;
  z-index: 9999999;
  background-color: ${colors.gray8};
  color: ${colors.light};
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  pointer-events: none;
`;

export const placementTooltipText = (placement: Placement, top: number, left: number, width: number, height: number) => {
  switch (placement) {
    case 'bottom': {
      return css`
        top: ${top + height}px;
        left: ${left + width / 2}px;
        transform: translate(-50%, 5px);
      `;
    }
    case 'top': {
      return css`
        top: ${top - 5}px;
        left: ${left + width / 2}px;
        transform: translate(-50%, -100%);
      `;
    }
    case 'left': {
      return css`
        top: ${top + height / 2}px;
        left: ${left - 5}px;
        transform: translate(-100%, -50%);
      `;
    }
    case 'right': {
      return css`
        top: ${top + height / 2}px;
        left: ${left + width}px;
        transform: translate(5px, -50%);
      `;
    }
  }
};
