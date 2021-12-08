export const GAME_LOG_TYPE = {
  CREATE_PROJECT: 'モンスター卵',
  COMPLETE_PROJECT: 'プロジェクト',
  ONLINE: 'オンライン',
  OFFLINE: 'オフライン',
  CREATE_FIRST_TASK: 'モンスター',
  CREATE_TASK: 'タスク',
  CREATE_LIST: 'リスト',
  COMPLETE_TASK: 'のダメージ',
  LEVEL_UP: 'レベル',
} as const
export type GAME_LOG_TYPE = typeof GAME_LOG_TYPE[keyof typeof GAME_LOG_TYPE]
