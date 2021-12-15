export type UpdatedTaskType = {
  id: number;
  high_status_name: typeof STATUS_TYPE | '';
  is_completed: boolean;
};

export const STATUS_TYPE = {
  TECHNOLOGY: 'technology',
  ACHIEVEMENT: 'achievement',
  SOLUTION: 'solution',
  MOTIVATION: 'motivation',
  DESIGN: 'design',
  PLAN: 'plan',
} as const;
type STATUS_TYPE = typeof STATUS_TYPE[keyof typeof STATUS_TYPE];
