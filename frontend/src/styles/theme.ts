import 'styled-components'

export const theme = {
  HEADER_HEIGHT: '70px',
  FONT_SIZES: {
    SIZE_10: '10px',
    SIZE_12: '12px',
    SIZE_14: '14px',
    SIZE_16: '16px',
    SIZE_18: '18px',
    SIZE_20: '20px',
    SIZE_22: '22px',
    SIZE_24: '24px',
    SIZE_28: '28px',
    SIZE_32: '32px',
    SIZE_36: '36px',
    SIZE_40: '40px',
    SIZE_48: '48px',
    SIZE_52: '52px',
    SIZE_56: '56px',
    SIZE_60: '60px',
  },
  FONT_WEIGHTS: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    HEAVY: 800,
    BLACK: 900,
  },
  COLORS: {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    ERROR: '#FF0000',
    NERO: '#100700',
    MINE_SHAFT: '#2C2C2C',
    NOBEL: '#B4B4B4',
    ALTO: '#D9D9D9',
    SILVER: '#C4C4C4',
    DODGER_BLUE: '#11B3F9',
    TENN: '#C95900',
    TEMPTRESS: '#3F0000',
    RED_OXIDE: '#660303',
    CHOCOLATE: '#4D2709',
    BRANDY: '#E0C29F',
    BRIDAL_HEATH: '#FFFAF4',
    TEQUILA: '#FFE5C7',
    BRIGHT_TURQUOISE: '#15CCF4',
  },
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
