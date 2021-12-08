import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'

/**
 * Firebase ログアウト処理
 */
export const useTrySignOut = () => {
  const navigate = useNavigate()

  const trySignOut = () => {
    firebaseAuth.signOut().then(() => {
      navigate('/signin')
    })
  }

  return trySignOut
}
