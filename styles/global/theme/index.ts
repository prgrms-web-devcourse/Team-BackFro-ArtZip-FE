import { Theme } from '@emotion/react';

const color = {
  red: '#FC3B41',
  pink: '#FFC0CB',
  blue: {
    main: '#242F9B',
    dark: '#646FD4',
    light: '#9BA3EB',
    white: '#DEDEFF',
  },
  black: '#000000',
  font: {
    main: '#3C3C3C',
    dark: '#828282',
    light: '#A3A3A3',
  },
  border: {
    main: '#CCCCCC',
    light: '#DDDDDD',
    white: '#F1F1F1',
  },
  background: '#FAFAFA',
  white: '#FFFFFF',
};

const breakPoint = {
  tablet: '1023px',
  mobile: '767px',
};

const theme: Theme = {
  color,
  breakPoint,
};

export default theme;
