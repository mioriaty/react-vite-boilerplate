import { Theme, ThemeProvider as ThemeMotionProvider } from '@emotion/react';
import { FC, ReactNode } from 'react';

export const defaultAppSettings: Theme = {
  colors: {
    primary: '#2C36DC',
    secondary: '#2AB885',
    tertiary: '#9540f7',
    quaternary: '#ff6565',
    light: '#ffffff',
    gray1: '#F8F8FC',
    gray2: '#f2f2f7',
    gray3: '#DEDEE9',
    gray4: '#D2D2E2',
    gray5: '#9E9ECC',
    gray6: '#6D6D9C',
    gray7: '#494880',
    gray8: '#26256C',
    gray9: '#17174F',
    dark: '#0f0f36',
  },
  fonts: {
    primary: 'Lexend Deca, sans-serif',
    secondary: 'Poppins, sans-serif',
    tertiary: 'Roboto, sans-serif',
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeMotionProvider theme={defaultAppSettings}>{children}</ThemeMotionProvider>;
};
