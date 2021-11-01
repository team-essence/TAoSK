import 'styled-components';
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA';

export const theme = {
  fontSizes: {
    xsmall: '10px',
    small: '12px',
    normalS: '14px',
    normal: '16px',
    normalL: '18px',
    large: '24px',
    xlarge: '32px',
  },
  colors: {
    primary: {
      white: convertIntoRGBA('#FFFFFF'),
      black: convertIntoRGBA('#000000'),
    },
    secondary: {},
    background: {},
    border: {},
  },
} as const;

type AppTheme = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
