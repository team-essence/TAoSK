import React, { FC, useEffect } from 'react'
import { useAuthContext } from 'providers/AuthProvider'
import { useNavigate, useParams } from 'react-router'
import logger from 'utils/debugger/logger'
import { useGetInvitationByUserIdLazyQuery, useJoinProjectMutation } from './Invitation.gen'
import { GQL_ERROR_MESSAGE } from 'consts/gqlErrorMessage'
import toast from 'utils/toast/toast'

export const Invitation: FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuthContext()
  const { projectId } = useParams()

  const [tryJoinProject] = useJoinProjectMutation({
    onCompleted(data) {
      navigate(`/projects/${data.joinProject.project.id}`)
    },
    onError(err) {
      toast.error('失敗しました')
      navigate('/')
    },
  })

  const [getInvitationByUserId] = useGetInvitationByUserIdLazyQuery({
    onCompleted(data) {
      logger.debug(data.invitation.project.id)
      logger.debug(data.invitation.user.id)
      toast.success('有効な招待です')
      tryJoinProject({
        variables: {
          invitationId: data.invitation.id,
          userId: data.invitation.user.id,
          projectId: data.invitation.project.id,
        },
      })
    },
    onError(err) {
      if (err.message === GQL_ERROR_MESSAGE.NOT_FOUND_EXCEPTION) {
        toast.error('無効な招待です')
        navigate('/')
      }
    },
  })

  useEffect(() => {
    if (!currentUser || !projectId) return

    getInvitationByUserId({
      variables: {
        userId: currentUser.uid,
        projectId: projectId,
      },
    })
  }, [currentUser])

  return <></>
}
