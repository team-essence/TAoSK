import { theme } from 'styles/theme'

export const BAR_TYPE = {
  HP: theme.COLORS.HP,
  HP_BG: theme.COLORS.HP_BG,
  MP: theme.COLORS.MP,
  MP_BG: theme.COLORS.MP_BG,
  EXP: theme.COLORS.EXP,
  EXP_BG: theme.COLORS.EXP_BG,
  TRANSPARENT: theme.COLORS.TRANSPARENT,
} as const
export type BAR_TYPE = typeof BAR_TYPE[keyof typeof BAR_TYPE]
