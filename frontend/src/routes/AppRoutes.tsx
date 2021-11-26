import React from 'react'
import { useRoutes } from 'react-router-dom'
import { useAuthContext } from 'providers/AuthProvider'
import { NotFound } from 'pages/notFound/NotFound'
import { protectedRoutes } from './Protected'
import { publicRoutes } from './Public'

export const AppRoutes = () => {
  const { currentUser } = useAuthContext()
  const commonRoutes = [{ path: '*', element: <NotFound /> }]
  const routes = currentUser ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
