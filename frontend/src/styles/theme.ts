import { calculateMinSizeBasedOnFigma } from 'utils/calculateMinSizeBasedOnFigma'
import 'styled-components'

export const theme = {
  HEADER_HEIGHT: calculateMinSizeBasedOnFigma('70px'),
  Z_INDEX: {
    INDEX_MINUS_1: -1,
    INDEX_1: 1,
    INDEX_2: 2,
    HEADER: 100,
  },
  FONT_SIZES: {
    SIZE_10: calculateMinSizeBasedOnFigma('10px'),
    SIZE_12: calculateMinSizeBasedOnFigma('12px'),
    SIZE_14: calculateMinSizeBasedOnFigma('14px'),
    SIZE_16: calculateMinSizeBasedOnFigma('16px'),
    SIZE_18: calculateMinSizeBasedOnFigma('18px'),
    SIZE_20: calculateMinSizeBasedOnFigma('20px'),
    SIZE_22: calculateMinSizeBasedOnFigma('22px'),
    SIZE_24: calculateMinSizeBasedOnFigma('24px'),
    SIZE_28: calculateMinSizeBasedOnFigma('28px'),
    SIZE_32: calculateMinSizeBasedOnFigma('32px'),
    SIZE_36: calculateMinSizeBasedOnFigma('36px'),
    SIZE_40: calculateMinSizeBasedOnFigma('40px'),
    SIZE_48: calculateMinSizeBasedOnFigma('48px'),
    SIZE_52: calculateMinSizeBasedOnFigma('52px'),
    SIZE_56: calculateMinSizeBasedOnFigma('56px'),
    SIZE_60: calculateMinSizeBasedOnFigma('60px'),
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
    LINEN: '#FEFDF9',
    CARARRA: '#EAE7E0',
    SHIP_GRAY: '#38373C',
    OLIVE_GREEN: '#A9BA65',
    MINE_SHAFT2: '#333333',
    ZINNWALDITE: '#EAC4A6',
    MONDO: '#463E29',
    SHIP_COVE: '#657DBA',
    BOULDER: '#7B7B7B',
  },
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
