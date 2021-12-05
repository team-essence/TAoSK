export const GQL_ERROR_MESSAGE = {
  NOT_FOUND_EXCEPTION: 'Not Found Exception',
} as const
export type GQL_ERROR_MESSAGE = typeof GQL_ERROR_MESSAGE[keyof typeof GQL_ERROR_MESSAGE]
