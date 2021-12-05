export const AVATAR_STYLE = {
  LIST: 'list',
  MODAL: 'modal',
  TASK: 'task',
} as const
export type AVATAR_STYLE = typeof AVATAR_STYLE[keyof typeof AVATAR_STYLE]
