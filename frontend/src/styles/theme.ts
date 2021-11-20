import 'styled-components'

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
    size_40: '40px',
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
    white: '#FFFFFF',
    black: '#000000',
    nero: '#100700',
    mineShaft: '#2c2c2c',
    dodgerBlue: '#11B3F9',
    tenn: '#C95900',
    chocolate: '#4D2709',
    seaPink: '#EFACAC',
    totemPole: '#AC0D0D',
  },
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
