import React, { useEffect } from 'react'
import { useAuthContext } from 'context/AuthProvider'
import { useNavigate, useParams } from 'react-router'
import logger from 'utils/debugger/logger'
import { useGetInvitationByUserIdLazyQuery, useJoinProjectMutation } from './Invitation.gen'
import { gqlErrorMessage } from 'consts/gqlErrorMessage'
import toast from 'utils/toast/toast'

const Invitation = () => {
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
      if (err.message === gqlErrorMessage.NOT_FOUND_EXCEPTION) {
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

export default Invitation
