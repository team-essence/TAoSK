export const ranks = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] as const
export const RANK_INTERVAL = 100
export type Rank = typeof ranks[number]
