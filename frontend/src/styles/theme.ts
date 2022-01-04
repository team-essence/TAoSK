import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import 'styled-components'
import { MAX_WIDTH } from 'consts/aspect'

export const theme = {
  HEADER_HEIGHT: calculateMinSizeBasedOnFigma('70px'),
  MAX_WIDTH: `${MAX_WIDTH}px`,
  Z_INDEX: {
    TAILED_DISPLAY: -1000,
    INDEX_MINUS_2: -2,
    INDEX_MINUS_1: -1,
    INDEX_0: 0,
    INDEX_1: 1,
    INDEX_2: 2,
    INDEX_3: 3,
    INDEX_4: 4,
    INDEX_5: 5,
    INDEX_6: 6,
    INDEX_7: 7,
    INDEX_8: 8,
    HEADER: 50,
    OVERLAY: 90,
    UPPER_OVERLAY: 91,
    UNDER_POPOVER: 98,
    POPOVER: 99,
    MODAL: 100,
    LOADING: 999,
    EFFECT: 1000,
    HOVER_POPPER: 13000, // Muiのmodalのz-indexが1300のため、モーダル上でPopperを表示させるにはそれと同値のz-indexを指定する必要がある
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
    SILVER: '#BFBFBF',
    DODGER_BLUE: '#11B3F9',
    TENN: '#C95900',
    TEMPTRESS: '#3F0000',
    RED_OXIDE: '#660303',
    RED_BERRY: '#970000',
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
    SISAL: '#D7CBC1',
    MONDO: '#463E29',
    SHIP_COVE: '#657DBA',
    BOULDER: '#7B7B7B',
    DUSTY_GRAY: '#A38F98',
    GALLERY: '#EFEFEF',
    STARK_WHITE: '#EBDECD',
    PEARL_BUSH: '#EDE5DE',
    SCORPION: '#575757',
    COD_GRAY: '#1E1E1E',
    BIZARRE: '#EEE4DA',
    TOBACCO_BROWN: '#665545',
    MATTERHORN: '#483B3D',
    MONSTER_HP: '#D94531',
    MONSTER_HP_BG: '#F0C3C3',
    SPICY_MIX: '#876143',
    GREEN: '#00B500',
    SWIRL: '#D8D0C9',
    COTTON_SEED: '#C4BCB5',
    TRANSPARENT: 'transparent',
    TOPAZ: '#878190',
    DOVE_GRAY: '#707070',
    SILVER_CHALICE: '#B1B1B1',
    CITRON: '#98B819',
    AKAROA: '#D4B99F',
    RODEO_DUST: '#C9AE95',
    HELIOTROPE: '#8D7AFF',
    PEACH_ORANGE: '#FFBE9A',
    RIVER_BED: '#464C5A',

    HP: '#85D931',
    HP_BG: '#DBF5C0',
    MP: '#31BBD9',
    MP_BG: '#C3E8F0',
    EXP: '#D9AA31',
    EXP_BG: '#E7D5A6',

    GRADATION: {
      TECHNOLOGY: {
        START: '#A84D4D',
        CENTER: '#D16060',
        END: '#A64545',
      },

      SOLUTION: {
        START: '#45877B',
        CENTER: '#65BAAA',
        END: '#489788',
      },

      ACHIEVEMENT: {
        START: '#B2562F',
        CENTER: '#D9754A',
        END: '#A75735',
      },

      MOTIVATION: {
        START: '#6A9B3A',
        CENTER: '#8FBA65',
        END: '#649237',
      },

      DESIGN: {
        START: '#5645C0',
        CENTER: '#7567CB',
        END: '#4F3CC0',
      },

      PLAN: {
        START: '#BFAD40',
        CENTER: '#D4C25C',
        END: '#B2A139',
      },
    },

    FONT: {
      TOBACCO_BROWN: '#665545',
      SILVER: '#BFBFBF',
      BLACK: '#38373C',
    },

    STATUS: {
      TECHNOLOGY: '#D16060',
      ACHIEVEMENT: '#D9754A',
      SOLUTION: '#65BAAA',
      MOTIVATION: '#8FBA65',
      DESIGN: '#7567CB',
      PLAN: '#D4C25C',
    },
  },
} as const

type AppTheme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
