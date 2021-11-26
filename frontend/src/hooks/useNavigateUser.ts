import { useEffect } from 'react'
import { useAuthContext } from 'context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useGetUserByIdLazyQuery } from 'pages/auth/document.gen'

/**
 * ログインユーザーに変更があった時に画面遷移を行う
 */
export const useNavigateUser = (): void => {
  const { currentUser } = useAuthContext()
  const [tryGetUserById, { data }] = useGetUserByIdLazyQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) return
    tryGetUserById({ variables: { id: currentUser.uid } })
    if (!data) return
    navigate('/')
  }, [currentUser])
}
