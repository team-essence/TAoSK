import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DropResult, resetServerContext } from 'react-beautiful-dnd'
import styled, { css } from 'styled-components'
import { useAuthContext } from 'providers/AuthProvider'
import { GetCurrentUserQuery } from './getUser.gen'
import { useSearchSameCompanyUsersMutation } from '../projectList/projectList.gen'
import {
  useCreateInvitationMutation,
  useUpdateTaskSortMutation,
  useCreateListMutation,
  useUpdateListSortMutation,
} from './projectDetail.gen'
import logger from 'utils/debugger/logger'
import toast from 'utils/toast/toast'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { usePresence } from 'hooks/usePresence'
import { useSetWeaponJson } from 'hooks/useSetWeaponJson'
import { useCompleteAnimation } from 'hooks/useCompleteAnimation'
import { StatusParam } from 'types/status'
import { List } from 'types/list'
import { Task } from 'types/task'
import { DEFAULT_USER } from 'consts/defaultImages'
import { DROP_TYPE } from 'consts/dropType'
import { ProjectDrawer } from 'components/models/project/ProjectDrawer'
import { ProjectRight } from 'components/models/project/ProjectRight'
import { ProjectMyInfo } from 'components/models/project/ProjectMyInfo'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { ProjectDetailHeader } from 'components/ui/header/ProjectDetailHeader'
import { LazyLoading } from 'components/ui/loading/LazyLoading'
import { TaskCompleteAnimation } from 'components/models/task/animation/TaskCompleteAnimation'
import { useProjectDetail } from 'hooks/useProjectDetail'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { Notifications } from 'types/notification'
import { useUpdateUserByTaskSubscription } from 'hooks/subscriptions/useUserByTaskSubscription'
import Exp from 'utils/exp/exp'

export const ProjectDetail: FC = () => {
  resetServerContext()
  usePresence()
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const { json, setWeapon } = useSetWeaponJson()
  const { anchorEl, isCompleted, setIsCompleted } = useCompleteAnimation<HTMLDivElement>(json)
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const [list, setList] = useState<List[]>([])
  const inputUserName = useInput('')
  const [userData, setUserData] = useState<GetCurrentUserQuery['user']>()
  const { updateUserByTask } = useUpdateUserByTaskSubscription()

  useEffect(() => {
    logger.debug(updateUserByTask)
    if (!updateUserByTask) return

    if (userData && Exp.toLevel(updateUserByTask.exp) > Exp.toLevel(userData.exp)) {
      toast.success(
        'レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！',
      )
    }

    setUserData(updateUserByTask)
  }, [updateUserByTask])

  const { projectData, monsterHPRemaining, monsterTotalHP, isTasks } = useProjectDetail(
    setSelectUserIds,
    setList,
  )

  const { currentUserData, notifications } = useGetCurrentUserData()

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

  const [updateTaskSort] = useUpdateTaskSortMutation({
    onCompleted(data) {
      logger.table(data.updateTaskSort)
      if (data.updateTaskSort.is_completed) {
        setWeapon(data.updateTaskSort.high_status_name as StatusParam)
        setIsCompleted(true)
      }
    },
    onError(err) {
      logger.debug(err)
      toast.error('タスクの移動に失敗しました')
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

  const [updateList] = useUpdateListSortMutation({
    onError(err) {
      toast.error('リスト更新に失敗しました')
    },
  })

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

  const removeFromList = (list: Task[], index: number): [Task, Task[]] => {
    const result = Array.from(list)
    const [removed] = result.splice(index, 1)
    return [removed, result]
  }

  const addToList = (list: Task[], index: number, element: Task) => {
    const result = Array.from(list)
    result.splice(index, 0, element)
    return result
  }

  const reorder = (array: List[], startIndex: number, endIndex: number) => {
    const result = Array.from(array)

    const previousItem = result[endIndex]
    const [removed] = result.splice(startIndex, 1)

    if (previousItem) {
      removed.index = previousItem.index
    }
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const { source, destination, type } = result
    const destinationDroppableId = Number(destination.droppableId)
    const sourceDroppableId = Number(source.droppableId)
    const destinationIndex = destination.index
    const sourceIndex = source.index
    if (destinationDroppableId === sourceDroppableId && destinationIndex === sourceIndex) return

    const listCopy = [...list]

    if (type === DROP_TYPE.COLUMN) {
      if (destinationIndex === 0) {
        toast.warning('未着手は固定されています')
        return
      }
      if (destinationIndex === list.length - 1) {
        toast.warning('完了は固定されています')
        return
      }
      const result = reorder(listCopy, sourceIndex, destinationIndex)
      setList(result)
      const updateListSort = result.map((list, index) => {
        return {
          id: list.sort_id,
          task_list: index,
        }
      })
      await updateList({
        variables: {
          listSort: updateListSort,
        },
      })
      return
    }

    const [removedElement, newSourceList] = removeFromList(
      listCopy[sourceDroppableId].tasks,
      sourceIndex,
    )

    listCopy[sourceDroppableId].tasks = newSourceList

    const destinationTask = listCopy[destinationDroppableId].tasks
    listCopy[destinationDroppableId].tasks = addToList(
      destinationTask,
      destinationIndex,
      removedElement,
    )

    const sortListCopy = listCopy.map(list => {
      const sortList = list.tasks.map((task, index) => {
        task.vertical_sort = index
        return task
      })

      list.tasks = sortList
      return list
    })

    //TODO: 完了にカードが移動したらcompleted_flgをtrueにする処理を書く必要あり
    const updateTasks = sortListCopy.map((list, index, { length }) => {
      logger.debug(length)
      return list.tasks.map((task, taskIndex) => {
        return {
          id: task.id,
          list_id: list.list_id,
          vertical_sort: taskIndex,
          completed_flg: index === length - 1 ? true : false,
        }
      })
    })
    // return

    const joinUpdateTasks = []
    for (let index = 0; index < updateTasks.length; index++) {
      joinUpdateTasks.push(...updateTasks[index])
    }

    logger.table([...joinUpdateTasks])
    await updateTaskSort({
      variables: {
        updateTasks: {
          tasks: joinUpdateTasks,
          project_id: String(id),
          user_id: currentUser?.uid ?? '',
        },
      },
    })

    setList(listCopy)
  }

  const handleCreateList = async () => {
    await createList({
      variables: {
        newList: {
          name: 'リスト名',
          project_id: String(id),
          task_list: 1,
          user_id: currentUser?.uid ?? '',
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
        list={list}
        groups={projectData.data?.getProjectById.groups ?? []}
      />
      <StyledProjectDetailContainer>
        <StyledProjectDetailLeftContainer>
          <ProjectDrawer
            groups={projectData.data?.getProjectById.groups}
            lists={list}
            onDragEnd={onDragEnd}
          />
          {!!userData && (
            <ProjectMyInfo
              {...userData}
              iconImage={userData.icon_image}
              occupation={userData.occupation.name}
              totalExp={userData.exp}
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
