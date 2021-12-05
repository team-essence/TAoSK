export const DROP_TYPE = {
  COLUMN: 'COLUMN',
  TASK: 'TASK',
} as const
export type DROP_TYPE = typeof DROP_TYPE[keyof typeof DROP_TYPE]
