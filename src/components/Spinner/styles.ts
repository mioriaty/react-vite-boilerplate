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

export const spinnerStyle =
  ({ colorName, speed, size }: { size: number; speed: number; colorName: keyof Theme['colors'] }) =>
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
      width: `${size}px`,
      height: `${size}px`,
    });
