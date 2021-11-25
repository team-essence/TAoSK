import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'

type UseTrySignIn = (arg: { email: string; password: string }) => () => void

/**
 * Firebaseでログイン処理を行なったのち、画面遷移を行う
 * @param {*} { email, password }
 * @return {*}
 */
export const useTrySignIn: UseTrySignIn = ({ email, password }) => {
  const navigate = useNavigate()

  const trySignIn = () => {
    firebaseAuth.signInUser(email, password).then(result => {
      if (result.user.uid) navigate('/')
    })
  }

  return trySignIn
}
