import React, { FC, useEffect } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { useAuthContext } from 'context/AuthProvider'
import logger from 'utils/debugger/logger'
import { useGetProjectMutation, useUpdateOnlineFlagMutation } from './projectDetail.gen'
import { group } from 'console'

export const ProjectDetail: FC = () => {
  const { currentUser } = useAuthContext()
  const { id } = useParams()
  const [getProjectById, projectData] = useGetProjectMutation()
  const [updateOnlineFlag, updatedUserData] = useUpdateOnlineFlagMutation()
  const handleBeforeUnloadEvent = async (userId: string) => {
    logger.debug('でる')
    await updateOnlineFlag({
      variables: {
        id: userId,
        isOnline: false,
      },
    })
  }

  useEffect(() => {
    if (!currentUser || !id) return

    const tryApi = async () => {
      await updateOnlineFlag({
        variables: {
          id: currentUser.uid,
          isOnline: true,
        },
      })

      await getProjectById({
        variables: {
          id: Number(id),
        },
      })
    }

    tryApi()
  }, [currentUser, id])

  useEffect(() => {
    if (!currentUser) return
    logger.debug('入る')
    window.addEventListener('beforeunload', () => handleBeforeUnloadEvent(currentUser.uid))
    return () =>
      window.removeEventListener('beforeunload', () => handleBeforeUnloadEvent(currentUser.uid))
  }, [currentUser])

  useEffect(() => {
    logger.debug(id)
  }, [id])

  return (
    <div>
      <p>プロジェクト詳細</p>
      {projectData.data?.getProjectById.groups.map(
        group =>
          group.user.online_flg && (
            <>
              <h2>オンライン</h2>
              <p>{group.user.name}</p>
              <p>{group.user.icon_image}</p>
              <p>{group.user.id}</p>
              <p>{group.user.mp}</p>
              <p>{group.user.hp}</p>
              <p>{group.user.occupation_id}</p>
              <p>{JSON.stringify(group.user.online_flg)}</p>
            </>
          ),
      )}
      {projectData.data?.getProjectById.groups.map(
        group =>
          !group.user.online_flg && (
            <>
              <h2>オフライン</h2>
              <p>{group.user.name}</p>
              <p>{group.user.icon_image}</p>
              <p>{group.user.id}</p>
              <p>{group.user.mp}</p>
              <p>{group.user.hp}</p>
              <p>{group.user.occupation_id}</p>
              <p>{JSON.stringify(group.user.online_flg)}</p>
            </>
          ),
      )}
      {/* {JSON.stringify(projectData.data?.getProjectById.groups)} */}
    </div>
  )
}
