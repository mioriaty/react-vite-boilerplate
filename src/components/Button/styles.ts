import { css, Theme } from '@emotion/react';

interface StyleMapping {
  fontSize: number;
  paddingVertical: number;
  paddingHorizontal: number;
}

const getSizeStyleMapping: Record<Size, StyleMapping> = {
  'extra-small': {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  small: {
    fontSize: 13,
    paddingHorizontal: 11,
    paddingVertical: 18,
  },
  medium: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  large: {
    fontSize: 16,
    paddingHorizontal: 13,
    paddingVertical: 22,
  },
};

export const container =
  ({ size, backgroundColor, color }: { size: Size; backgroundColor: keyof Theme['colors']; color: keyof Theme['colors'] }) =>
  ({ fonts, colors }: Theme) =>
    css`
      background-color: ${colors[backgroundColor]};
      color: ${colors[color]};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      outline: none;
      cursor: pointer;
      appearance: none;
      line-height: 1.5;
      font-weight: 500;
      transition: all 0.3s ease;
      font-family: ${fonts.secondary};
      font-size: ${getSizeStyleMapping[size].fontSize}px;
      padding: ${getSizeStyleMapping[size].paddingHorizontal}px ${getSizeStyleMapping[size].paddingVertical}px;
      border-radius: 4px;
      border: none;
    `;

export const loading = css`
  margin-right: 4px;
  * {
    color: inherit !important;
  }
`;

export const text = css`
  vertical-align: middle;
`;

export const block = (block: boolean) => {
  if (!block) {
    return {};
  }
  return css`
    width: 100%;
  `;
};

export const disabled = (disabled: boolean) => {
  if (!disabled) {
    return {};
  }
  return css`
    opacity: 0.4;
    cursor: no-drop;
  `;
};
