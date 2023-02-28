import './styles/base.css';

import { Theme, ThemeProvider } from '@emotion/react';

import { AppRoutes } from './routes';

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
    primary: 'Roboto, sans-serif',
    secondary: 'Lexend Deca, sans-serif',
    tertiary: 'Poppins, sans-serif',
  },
};

function App() {
  return (
    <ThemeProvider theme={defaultAppSettings}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
