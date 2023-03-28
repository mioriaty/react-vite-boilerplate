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
    css({
      display: 'inline-block',
      borderRadius: '99999px',
      animation: `${spin} ${speed}s linear infinite`,
      borderTop: `2px solid ${colors[colorName]}`,
      borderRight: `2px solid ${colors[colorName]}`,
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      width: `${thickness ? thickness : mappingSize[size]}px`,
      height: `${thickness ? thickness : mappingSize[size]}px`,
    });
