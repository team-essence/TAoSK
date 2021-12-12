import React, { FC, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { useAuthContext } from 'providers/AuthProvider'
import { NotFound } from 'pages/notFound/NotFound'
import { protectedRoutes } from './Protected'
import { publicRoutes } from './Public'
import logger from 'utils/debugger/logger'
import { useUpdateOnlineFlagMutation } from 'pages/projectDetail/projectDetail.gen'

export const AppRoutes: FC = () => {
  const { currentUser } = useAuthContext()
  const [projectId, setProjectId] = useState('')
  const commonRoutes = [{ path: '*', element: <NotFound /> }]
  const routes = currentUser ? protectedRoutes : publicRoutes

  const [updateOnlineFlag] = useUpdateOnlineFlagMutation()

  const element = useRoutes([...routes, ...commonRoutes])

  useEffect(() => {
    logger.debug(location.pathname)
    if (!currentUser) return
    if (location.pathname.includes('projects'))
      return setProjectId(location.pathname.replace('/projects/', ''))

    if (projectId) {
      updateOnlineFlag({
        variables: {
          id: currentUser.uid,
          project_id: projectId,
          isOnline: false,
        },
      })
    }
  }, [currentUser, location.pathname])

  return <>{element}</>
}
