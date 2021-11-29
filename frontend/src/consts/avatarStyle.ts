export const AVATAR_STYLE = {
  LIST: 'list',
  MODAL: 'modal',
  TASK: 'task',
} as const
export type AVATAR_STYLE_TYPE = typeof AVATAR_STYLE[keyof typeof AVATAR_STYLE]
