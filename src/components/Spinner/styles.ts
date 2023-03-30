import { css, keyframes, Theme } from '@emotion/react';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const innerChild = css`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

const mappingSize: Record<Size, number> = {
  'extra-small': 10,
  small: 15,
  medium: 20,
  large: 25,
};

export const spinnerStyle =
  ({ colorName, speed, thickness, size }: { speed: number; colorName: keyof Theme['colors']; size: Size; thickness?: number }) =>
  ({ colors }: Theme) =>
    css`
      display: inline-block;
      border-radius: 99999px;
      animation: ${spin} ${speed}s linear infinite;
      border-top: 2px solid ${colors[colorName]};
      border-right: 2px solid ${colors[colorName]};
      border-bottom-style: solid;
      border-left-style: solid;
      border-bottom-width: 2px;
      border-left-width: 2px;
      border-bottom-color: transparent;
      border-left-color: transparent;
      width: ${thickness ? thickness : mappingSize[size]}px;
      height: ${thickness ? thickness : mappingSize[size]}px;
    `;
