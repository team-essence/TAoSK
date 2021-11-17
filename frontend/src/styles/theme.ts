import 'styled-components'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

export const theme = {
  headerHeight: '70px',
  fontSizes: {
    size_10: '10px',
    size_12: '12px',
    size_14: '14px',
    size_16: '16px',
    size_18: '18px',
    size_20: '20px',
    size_22: '22px',
    size_24: '24px',
    size_28: '28px',
    size_32: '32px',
    size_36: '36px',
    size_48: '48px',
    size_52: '52px',
    size_56: '56px',
    size_60: '60px',
  },
  fontWeights: {
    normal: 400,
    bold: 700,
    heavy: 800,
    black: 900,
  },
  colors: {
    white: convertIntoRGBA('#FFFFFF'),
    black: convertIntoRGBA('#000000'),
    mineShaft: convertIntoRGBA('#2c2c2c'),
    dodgerBlue: convertIntoRGBA('#11B3F9'),
  },
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
