import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import 'styled-components'

export const theme = {
  HEADER_HEIGHT: calculateMinSizeBasedOnFigmaWidth('70px'),
  Z_INDEX: {
    INDEX_MINUS_1: -1,
    INDEX_1: 1,
    INDEX_2: 2,
    INDEX_3: 3,
    HEADER: 100,
  },
  FONT_SIZES: {
    SIZE_10: calculateMinSizeBasedOnFigmaWidth('10px'),
    SIZE_12: calculateMinSizeBasedOnFigmaWidth('12px'),
    SIZE_14: calculateMinSizeBasedOnFigmaWidth('14px'),
    SIZE_16: calculateMinSizeBasedOnFigmaWidth('16px'),
    SIZE_18: calculateMinSizeBasedOnFigmaWidth('18px'),
    SIZE_20: calculateMinSizeBasedOnFigmaWidth('20px'),
    SIZE_22: calculateMinSizeBasedOnFigmaWidth('22px'),
    SIZE_24: calculateMinSizeBasedOnFigmaWidth('24px'),
    SIZE_28: calculateMinSizeBasedOnFigmaWidth('28px'),
    SIZE_32: calculateMinSizeBasedOnFigmaWidth('32px'),
    SIZE_36: calculateMinSizeBasedOnFigmaWidth('36px'),
    SIZE_40: calculateMinSizeBasedOnFigmaWidth('40px'),
    SIZE_48: calculateMinSizeBasedOnFigmaWidth('48px'),
    SIZE_52: calculateMinSizeBasedOnFigmaWidth('52px'),
    SIZE_56: calculateMinSizeBasedOnFigmaWidth('56px'),
    SIZE_60: calculateMinSizeBasedOnFigmaWidth('60px'),
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
    SILVER: '#BFBFBF',
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
    FALU_RED: '#7B1616',
    BITTER_COCOA_BROWN: '#342422',
    SWEET_COCOA_BROWN: '#4A201F',
    BLACK_WHITE: '#FFFEF9',
    LINEN: '#FEFDF9',
    CARARRA: '#EAE7E0',
    SHIP_GRAY: '#38373C',
    OLIVE_GREEN: '#A9BA65',
    ZINNWALDITE: '#EAC4A6',
    MONDO: '#463E29',
    SHIP_COVE: '#657DBA',
    BOULDER: '#7B7B7B',
    STARK_WHITE: '#EBDECD',
    PEARL_BUSH: '#EDE5DE',
    SCORPION: '#575757',
    COD_GRAY: '#1E1E1E',
    HP: '#85D931',
    HP_BG: '#DBF5C0',
    MP: '#31BBD9',
    MP_BG: '#C3E8F0',
    BIZARRE: '#EEE4DA',
    TOBACCO_BROWN: '#665545',
    MATTERHORN: '#483B3D',
    MONSTER_HP: '#D94531',
    MONSTER_HP_BG: '#F0C3C3',
    SPICY_MIX: '#876143',
    GREEN: '#00B500',

    GRADATION: {
      TECHNOLOGY: {
        START: '#514694',
        CENTER: '#6A5EB6',
        END: '#4D428C',
      },

      SOLUTION: {
        START: '#BFA921',
        CENTER: '#D7BE2C',
        END: '#C2AC2E',
      },

      ACHIEVEMENT: {
        START: '#AC46A9',
        CENTER: '#C768C4',
        END: '#983996',
      },

      MOTIVATION: {
        START: '#7B4336',
        CENTER: '#B16F60',
        END: '#9D4430',
      },

      DESIGN: {
        START: '#339A85',
        CENTER: '#60B1A1',
        END: '#2E8E7B',
      },

      PLAN: {
        START: '#68973A',
        CENTER: '#88B160',
        END: '#5A8B29',
      },
    },

    FONT: {
      TOBACCO_BROWN: '#665545',
      SILVER: '#BFBFBF',
      BLACK: '#38373C',
    },

    STATUS: {
      TECHNOLOGY: '#6558B9',
      ACHIEVEMENT: '#C26DBF',
      SOLUTION: '#D4C25C',
      MOTIVATION: '#BA7565',
      DESIGN: '#65BAAA',
      PLAN: '#8FBA65;',
    },
  },
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
