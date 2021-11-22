import { auth } from 'utils/lib/firebase/firebaseInitial'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const firebaseAuth = {
  /**
   * create user
   * @param {string} email [メールアドレス]
   * @param {string} password [パスワード]
   */
  createUser: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  },
  /**
   * sign in user
   * @param {string} email [メールアドレス]
   * @param {string} password [パスワード]
   */
  signInUser: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  },
  // ログアウト
  signOut: () => {
    signOut(auth)
  },
} as const
