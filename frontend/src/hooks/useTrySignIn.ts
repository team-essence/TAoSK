import { FIREBASE_ERROR_TYPE } from 'consts/firebaseError'
import { useNavigate } from 'react-router-dom'
import logger from 'utils/debugger/logger'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import toast from 'utils/toast/toast'

type UseTrySignIn = (arg: { email: string; password: string }) => () => void

/**
 * Firebaseでログイン処理を行なったのち、画面遷移を行う
 * @param {*} { email, password }
 * @return {*}
 */
export const useTrySignIn: UseTrySignIn = ({ email, password }) => {
  const navigate = useNavigate()

  const trySignIn = () => {
    firebaseAuth
      .signInUser(email, password)
      .then(result => {
        if (result.user.uid) navigate('/')
      })
      .catch(err => {
        logger.table(err.code)
        switch (err.code) {
          case FIREBASE_ERROR_TYPE.AUTH_WRONG_PASSWORD:
            toast.error('パスワードが間違っている可能性があります')
            break
          case FIREBASE_ERROR_TYPE.AUTH_USER_NOT_FOUND:
            toast.error('メールアドレスが間違っている可能性があります')
            break

          default:
            break
        }
      })
  }

  return trySignIn
}
