import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import 'styled-components'

export const theme = {
  HEADER_HEIGHT: calculateVwBasedOnFigma('70px'),
  Z_INDEX: {
    INDEX_MINUS_1: -1,
    INDEX_1: 1,
    INDEX_2: 2,
    HEADER: 100,
  },
  FONT_SIZES: {
    SIZE_10: calculateVwBasedOnFigma('10px'),
    SIZE_12: calculateVwBasedOnFigma('12px'),
    SIZE_14: calculateVwBasedOnFigma('14px'),
    SIZE_16: calculateVwBasedOnFigma('16px'),
    SIZE_18: calculateVwBasedOnFigma('18px'),
    SIZE_20: calculateVwBasedOnFigma('20px'),
    SIZE_22: calculateVwBasedOnFigma('22px'),
    SIZE_24: calculateVwBasedOnFigma('24px'),
    SIZE_28: calculateVwBasedOnFigma('28px'),
    SIZE_32: calculateVwBasedOnFigma('32px'),
    SIZE_36: calculateVwBasedOnFigma('36px'),
    SIZE_40: calculateVwBasedOnFigma('40px'),
    SIZE_48: calculateVwBasedOnFigma('48px'),
    SIZE_52: calculateVwBasedOnFigma('52px'),
    SIZE_56: calculateVwBasedOnFigma('56px'),
    SIZE_60: calculateVwBasedOnFigma('60px'),
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
    GRAY: '#8F8F8F',
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
    GOLD_SAND: '#E8B382',
    SWEET_CON: '#FCE286',
    TIA_MARIA: '#D94B0E',
    SEA_PINK: '#EFACAC',
    TOTEM_POLE: '#AC0D0D',
  },
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
