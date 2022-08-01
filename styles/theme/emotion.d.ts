import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      red: string;
      blue: {
        main: string;
        dark: string;
        light: string;
      };
      black: string;
      font: {
        main: string;
        dark: string;
        light: string;
      };
      border: {
        normal: string;
        light: string;
      };
      background: string;
      white: string;
    };
    breakPoint: {
      tablet: string;
      mobile: string;
    };
  }
}
