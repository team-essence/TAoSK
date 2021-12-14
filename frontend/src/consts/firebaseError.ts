export const FIREBASE_ERROR_TYPE = {
  AUTH_WRONG_PASSWORD: 'auth/wrong-password',
  AUTH_USER_NOT_FOUND: 'auth/user-not-found',
  AUTH_EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
} as const
export type FIREBASE_ERROR_TYPE = typeof FIREBASE_ERROR_TYPE[keyof typeof FIREBASE_ERROR_TYPE]
