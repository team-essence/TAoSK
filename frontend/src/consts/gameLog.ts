export const GAME_LOG_TYPE = {
  EAG: 'モンスターの卵',
  COMPLETE_PROJECT: '完了',
  ONLINE: 'オンライン',
  OFFLINE: 'オフライン',
  FIRST_TASK: 'モンスター',
  CREATE_TASK: 'タスク',
  CREATE_LIST: 'リスト',
  COMPLETE_TASK: 'のダメージ',
  LEVEL_UP: 'レベル',
} as const
export type GAME_LOG_TYPE = typeof GAME_LOG_TYPE[keyof typeof GAME_LOG_TYPE]
