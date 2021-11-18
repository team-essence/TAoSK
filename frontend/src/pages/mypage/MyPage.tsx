import React, { FC, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from 'context/AuthProvider'
import { useGetUserLazyQuery } from './mypage.gen'

export const MyPage: FC = () => {
  const [isMounted, setisMounted] = useState<boolean>(false)
  const { currentUser } = useAuthContext()
  const { id } = useParams()
  const [getUserById, userQuery] = useGetUserLazyQuery()

  useEffect(() => {
    if (!currentUser) return
    setisMounted(true)
    getUserById({ variables: { id: currentUser.uid } })
  }, [currentUser, getUserById])

  if (!currentUser) return <Navigate to="/signup" />
  if (isMounted && currentUser.uid !== id) return <Navigate to="/" />

  return (
    <div>
      <p>マイページ</p>
      <pre>{JSON.stringify(userQuery.data?.user, null, '\t')}</pre>
    </div>
  )
}
