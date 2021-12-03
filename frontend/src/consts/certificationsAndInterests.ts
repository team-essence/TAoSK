export const MAX_LENGTH = {
  TEXT_LENGTH: 50,
  ITEMS: 20,
} as const
export type MAX_LENGTH = typeof MAX_LENGTH[keyof typeof MAX_LENGTH]
