import React, { FC, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { resetServerContext } from 'react-beautiful-dnd'
import styled, { css } from 'styled-components'
import { useSearchSameCompanyUsersMutation } from '../projectList/projectList.gen'
import { useCreateInvitationMutation, useCreateListMutation } from './projectDetail.gen'
import toast from 'utils/toast/toast'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { usePresence } from 'hooks/usePresence'
import { useSetWeaponJson } from 'hooks/useSetWeaponJson'
import { useCompleteAnimation } from 'hooks/useCompleteAnimation'
import { List } from 'types/list'
import { DEFAULT_USER } from 'consts/defaultImages'
import { ProjectDrawer } from 'components/models/project/ProjectDrawer'
import { ProjectRight } from 'components/models/project/ProjectRight'
import { ProjectMyInfo } from 'components/models/project/ProjectMyInfo'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { ProjectDetailHeader } from 'components/ui/header/ProjectDetailHeader'
import { LazyLoading } from 'components/ui/loading/LazyLoading'
import { TaskCompleteAnimation } from 'components/models/task/animation/TaskCompleteAnimation'
import { ConfirmModal } from 'components/ui/modal/ConfirmModal'
import { ProjectClearOverlay } from 'components/models/project/ProjectClearOverlay'
import { useProjectDetailDragEnd } from 'hooks/useProjectDetailDragEnd'
import { useProjectDetail } from 'hooks/useProjectDetail'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useFetchSubscriptionCurrentUserDataFromProjectDetail } from 'hooks/subscriptions/useFetchSubscriptionCurrentUserDataFromProjectDetail'

export const ProjectDetail: FC = () => {
  resetServerContext()
  usePresence()
  const { id } = useParams()
  const { json, setWeapon } = useSetWeaponJson()
  const { anchorEl, isCompleted, setIsCompleted } = useCompleteAnimation<HTMLDivElement>(json)
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const [lists, setLists] = useState<List[]>([])
  const inputUserName = useInput('')

  const { projectData, monsterHPRemaining, monsterTotalHP, isTasks } = useProjectDetail(
    setSelectUserIds,
    setLists,
  )

  const { currentUserData, firebaseCurrentUser, notifications, setNotifications, setUserData } =
    useGetCurrentUserData()
  useFetchSubscriptionCurrentUserDataFromProjectDetail(
    currentUserData,
    setUserData,
    setNotifications,
  )

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

  const [createList] = useCreateListMutation({
    onCompleted(data) {
      toast.success('リストを作成しました')
    },
    onError(err) {
      toast.error('リスト作成に失敗しました')
    },
  })

  const {
    onDragEnd,
    shouldOpenProjectCloseModal,
    onClickProjectCloseBtn,
    onClickCancelBtn,
    hasClearedProject,
  } = useProjectDetailDragEnd({
    lists,
    setLists,
    setWeapon,
    setIsCompleted,
    firebaseCurrentUser,
  })
  const isClearProject = useMemo<boolean>(
    () => !!projectData.data?.getProjectById.project_end_flg || hasClearedProject,
    [projectData.data?.getProjectById.project_end_flg, hasClearedProject],
  )

  const debouncedInputText = useDebounce<string>(inputUserName.value, 500)

  useEffect(() => {
    searchSameCompanyUsers({
      variables: {
        selectUserIds: selectUserIds,
        name: debouncedInputText,
        company: currentUserData?.company ? currentUserData.company : '',
      },
    })
  }, [debouncedInputText])

  const handleInsertSelectUserId = (userId: string) => {
    setSelectUserIds(selectUserIds => [...selectUserIds, userId])
  }

  const handleCreateList = async () => {
    await createList({
      variables: {
        newList: {
          name: 'リスト名',
          project_id: String(id),
          task_list: 1,
          user_id: firebaseCurrentUser?.uid ?? '',
        },
      },
    })
  }

  return (
    <>
      <LazyLoading />
      {isCompleted && <TaskCompleteAnimation ref={anchorEl} />}
      <ProjectDetailHeader
        iconImage={currentUserData?.icon_image ?? DEFAULT_USER}
        name={currentUserData?.name ?? ''}
        uid={currentUserData?.id ?? ''}
        totalExp={currentUserData?.exp ?? 0}
        company={currentUserData?.company ?? ''}
        notifications={notifications}
        lists={lists}
        groups={projectData.data?.getProjectById.groups ?? []}
      />
      <StyledProjectDetailContainer>
        <StyledProjectDetailLeftContainer>
          <ProjectDrawer
            groups={projectData.data?.getProjectById.groups}
            lists={lists}
            onDragEnd={onDragEnd}
          />
          {!!currentUserData && (
            <ProjectMyInfo
              {...currentUserData}
              iconImage={currentUserData.icon_image}
              occupation={currentUserData.occupation.name}
              totalExp={currentUserData.exp}
            />
          )}
        </StyledProjectDetailLeftContainer>
        <StyledProjectDetailRightContainer>
          <ProjectRight
            onClick={handleCreateList}
            monsterHPRemaining={monsterHPRemaining}
            monsterHp={monsterTotalHP}
            monsterName={projectData.data?.getProjectById.monster.name ?? ''}
            isTasks={isTasks}
          />
        </StyledProjectDetailRightContainer>
      </StyledProjectDetailContainer>
      <ConfirmModal
        title="確認"
        message="最後のタスクを完了し、プロジェクトをクローズしますか?"
        shouldShow={shouldOpenProjectCloseModal}
        onClickAcceptBtn={onClickProjectCloseBtn}
        onClickCloseBtn={onClickCancelBtn}
      />
      <ProjectClearOverlay shouldOpen={hasClearedProject} />
      <StyledBackground />
    </>
  )
}

const StyledProjectDetailContainer = styled.div`
  padding-top: calc(
    ${({ theme }) => theme.HEADER_HEIGHT} + ${calculateMinSizeBasedOnFigmaWidth(8)}
  );
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: auto ${calculateMinSizeBasedOnFigmaWidth(283)};
  grid-template-rows: auto 1fr;
`
const StyledProjectDetailLeftContainer = styled.div`
  height: 100%;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  overflow-x: auto;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
`
const StyledProjectDetailRightContainer = styled.div`
  height: 100%;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`
const StyledBackground = styled.div`
  ${({ theme }) => css`
    z-index: ${theme.Z_INDEX.INDEX_MINUS_1};
    top: ${theme.HEADER_HEIGHT};
    height: calc(100vh - ${theme.HEADER_HEIGHT});
  `};
  position: fixed;
  left: 0;
  width: 100vw;
  background: url('/images/project-detail_background.webp');
  background-attachment: fixed;
  background-position: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
