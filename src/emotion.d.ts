import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      light: string;
      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;
      gray7: string;
      gray8: string;
      gray9: string;
      dark: string;
    };
    fonts: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary?: string;
    };
  }
}
