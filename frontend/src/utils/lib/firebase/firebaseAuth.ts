import { auth } from 'utils/lib/firebase/firebaseInitial'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
} from 'firebase/auth'

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
    return signOut(auth)
  },
  /**
   * メールアドレス変更メールを送信
   * @param {string} email [メールアドレス]
   */
  changeEmail: async (email: string) => {
    if (!auth.currentUser) return
    await updateEmail(auth.currentUser, email)
  },
  /**
   * パスワード変更メールを送信
   * @param {string} email [メールアドレス]
   */
  changePassword: async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
  },
} as const
