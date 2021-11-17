import React, { FC, useEffect, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { useAuthContext } from 'context/AuthProvider'
import { useGetCurrentUserLazyQuery } from './getUser.gen'
import {
  useGetProjectMutation,
  useUpdateOnlineFlagMutation,
  useCreateInvitationMutation,
} from './projectDetail.gen'
import styled from 'styled-components'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import logger from 'utils/debugger/logger'
import { group } from 'console'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { useCreateProjectMutation, useSearchSameCompanyUsersMutation } from '../projectList.gen'
import toast from 'utils/toast/toast'

export const ProjectDetail: FC = () => {
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const inputUserName = useInput('')
  const [getProjectById, projectData] = useGetProjectMutation({
    onCompleted(data) {
      logger.debug(data.getProjectById.groups)
      data.getProjectById.groups.map(group => {
        setSelectUserIds(groupList => [...groupList, group.user.id])
      })
    },
  })
  const [getCurrentUser, currentUserData] = useGetCurrentUserLazyQuery({})
  const [updateOnlineFlag, updatedUserData] = useUpdateOnlineFlagMutation()
  const [searchSameCompanyUsers, searchSameCompanyUsersData] = useSearchSameCompanyUsersMutation()
  const [createInvitation] = useCreateInvitationMutation({
    onCompleted(data) {
      toast.success(`${data.createInvitation.user.name}を招待しました`)
      handleInsertSelectUserId(data.createInvitation.user.id)
    },
    onError(err) {
      toast.error('招待に失敗しました')
    },
  })
  const debouncedInputText = useDebounce(inputUserName.value, 500)

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
    if (!currentUser) return

    getCurrentUser({
      variables: {
        id: currentUser.uid,
      },
    })
  }, [currentUser])

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
    searchSameCompanyUsers({
      variables: {
        selectUserIds: selectUserIds,
        name: debouncedInputText,
        company: currentUserData.data?.user.company ? currentUserData.data.user.company : '',
      },
    })
  }, [debouncedInputText])

  const handleInsertSelectUserId = (userId: string) => {
    setSelectUserIds(selectUserIds => [...selectUserIds, userId])
  }

  const handleInvitation = async (userId: string, projectId: string) => {
    await createInvitation({
      variables: {
        userId,
        projectId,
      },
    })
  }

  return (
    <ProjectDetailContainer>
      <ProjectTitleContainer>
        プロジェクト詳細
        <button style={{ border: 'solid' }}>招待</button>
        <input type="text" {...inputUserName} placeholder={'ユーザ名'} />
        {debouncedInputText &&
          searchSameCompanyUsersData.data?.searchSameCompanyUsers.map(searchSameCompanyUsers =>
            selectUserIds.includes(searchSameCompanyUsers.id) ? (
              <></>
            ) : (
              <div key={searchSameCompanyUsers.id}>
                <h2>名前: {searchSameCompanyUsers.name}</h2>
                <p>id: {searchSameCompanyUsers.id}</p>
                <button
                  onClick={() => handleInvitation(searchSameCompanyUsers.id, id as string)}
                  style={{ border: 'solid' }}>
                  招待する
                </button>
              </div>
            ),
          )}
      </ProjectTitleContainer>

      <ProjectDetailLeftContainer>
        <div>
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
        <p>左側</p>

        <div>
          {currentUserData.data && (
            <>
              <img
                src={currentUserData.data.user.icon_image}
                alt={currentUserData.data.user.name}
              />
              <h4>{currentUserData.data.user.name}</h4>
              <p>HP: {currentUserData.data.user.hp}</p>
              <p>MP: {currentUserData.data.user.mp}</p>
              <p>EXP: {currentUserData.data.user.exp}</p>

              <p>技術力: {currentUserData.data.user.technology}</p>
              <p>達成力: {currentUserData.data.user.achievement}</p>
              <p>意欲: {currentUserData.data.user.motivation}</p>
              <p>問題発見・解決力: {currentUserData.data.user.solution}</p>
              <p>設計力: {currentUserData.data.user.plan}</p>
              <p>デザイン力: {currentUserData.data.user.design}</p>
              <p>
                ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
              </p>
            </>
          )}
        </div>
      </ProjectDetailLeftContainer>

      <ProjectDetailRightContainer>
        <p>右側</p>
      </ProjectDetailRightContainer>
    </ProjectDetailContainer>
  )
}

const ProjectDetailContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
  grid-template-rows: auto 1fr;
`

const ProjectTitleContainer = styled.p`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
`

const ProjectDetailLeftContainer = styled.div`
  height: 100%;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  overflow-x: auto;
  white-space: nowrap;
`

const ProjectDetailRightContainer = styled.div`
  height: 100%;
  background: ${convertIntoRGBA('#000000', 0.5)};
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`
