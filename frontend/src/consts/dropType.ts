export const DropType = {
  COLUMN: 'COLUMN',
  TASK: 'TASK',
} as const

export type DROP_TYPE = typeof DropType[keyof typeof DropType]
