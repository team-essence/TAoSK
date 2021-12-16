import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DropResult, resetServerContext } from 'react-beautiful-dnd'
import styled, { css } from 'styled-components'
import { useAuthContext } from 'providers/AuthProvider'
import { useGetCurrentUserLazyQuery } from './getUser.gen'
import { useSearchSameCompanyUsersMutation } from '../projectList/projectList.gen'
import {
  useGetProjectLazyQuery,
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
import { JsonType } from 'types/completeAnimation'
import { List } from 'types/list'
import { Task } from 'types/task'
import { DROP_TYPE } from 'consts/dropType'
import { ProjectDrawer } from 'components/models/project/ProjectDrawer'
import { ProjectRight } from 'components/models/project/ProjectRight'
import { ProjectMyInfo } from 'components/models/project/ProjectMyInfo'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { ProjectDetailHeader } from 'components/ui/header/ProjectDetailHeader'
import { LazyLoading } from 'components/ui/loading/LazyLoading'
import { TaskCompleteAnimation } from 'components/models/task/animation/TaskCompleteAnimation'
import { Notifications } from 'types/notification'

export const ProjectDetail: FC = () => {
  resetServerContext()
  usePresence()
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const { json, setWeapon } = useSetWeaponJson()
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const [notifications, setNotifications] = useState<Notifications>([])
  const [monsterHPRemaining, setMonsterHPRemaining] = useState(0)
  const [monsterTotalHP, setMonsterTotalHP] = useState(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const inputUserName = useInput('')
  const [getProjectById, projectData] = useGetProjectLazyQuery({
    onCompleted(data) {
      data.getProjectById.groups.map(group => {
        setSelectUserIds(groupList => [...groupList, group.user.id])
      })

      const sortList: List[] = data.getProjectById.lists.map(list => {
        const tasks = list.tasks.map(task => {
          const totalStatusPoint =
            task.technology +
            task.achievement +
            task.solution +
            task.motivation +
            task.plan +
            task.design

          setMonsterHPRemaining(monsterHPRemaining => {
            if (task.completed_flg) return monsterHPRemaining
            return monsterHPRemaining + totalStatusPoint
          })
          setMonsterTotalHP(monsterTotalHP => monsterTotalHP + totalStatusPoint)

          const allocations = task.allocations.map(allocation => {
            return {
              id: allocation.user.id,
              name: allocation.user.name,
              icon_image: allocation.user.icon_image,
              occupation: allocation.user.occupation,
            }
          })

          return {
            id: task.id,
            title: task.title,
            overview: task.overview,
            technology: task.technology,
            achievement: task.achievement,
            solution: task.solution,
            motivation: task.motivation,
            plan: task.plan,
            design: task.design,
            vertical_sort: task.vertical_sort,
            end_date: task.end_date,
            chatCount: task.chatCount,
            allocations,
          }
        })

        return {
          id: list.id,
          list_id: list.list_id,
          sort_id: list.listSorts[0].id,
          index: list.listSorts[0].task_list,
          title: list.name,
          tasks: tasks.sort((a, b) => a.vertical_sort - b.vertical_sort),
        }
      })

      sortList.sort((a, b) => a.index - b.index)

      logger.debug(sortList)
      setList(sortList)
    },
    onError(err) {
      logger.debug(err)
    },
  })
  const [getCurrentUser, currentUserData] = useGetCurrentUserLazyQuery({
    onCompleted(data) {
      const notifications: Notifications = data.user.invitations.map(invitation => {
        return {
          id: invitation.project.id,
          name: invitation.project.name,
          createAt: invitation.created_at,
        }
      })
      setNotifications(notifications)
    },
  })

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
        setWeapon('plan') // 一旦固定
        setIsComplete(true)
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
      const newListData = data.createList

      const tasks = newListData.tasks.map(task => {
        const allocations = task.allocations.map(allocation => {
          return {
            id: allocation.user.id,
            name: allocation.user.name,
            icon_image: allocation.user.icon_image,
            occupation: allocation.user.occupation,
          }
        })

        return {
          id: task.id,
          title: task.title,
          overview: task.overview,
          technology: task.technology,
          achievement: task.achievement,
          solution: task.solution,
          motivation: task.motivation,
          plan: task.plan,
          design: task.design,
          vertical_sort: task.vertical_sort,
          end_date: task.end_date,
          chatCount: task.chatCount,
          allocations,
        }
      })

      const newList: List = {
        id: newListData.id,
        list_id: newListData.list_id,
        sort_id: newListData.listSorts[0].id,
        index: newListData.listSorts[0].task_list,
        title: newListData.name,
        tasks: tasks.sort((a, b) => a.vertical_sort - b.vertical_sort),
      }

      const listCopy = list
      listCopy.splice(newListData.listSorts[0].task_list, 0, newList)
      const result = listCopy
        .map((list, index) => {
          list.index = index
          return list
        })
        .sort((a, b) => a.index - b.index)

      setList(result)
      const updateListSort = result.map((list, index) => {
        return {
          id: list.sort_id,
          task_list: index,
        }
      })
      updateList({
        variables: {
          listSort: updateListSort,
        },
      })
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

  const [list, setList] = useState<List[]>([])
  const debouncedInputText = useDebounce<string>(inputUserName.value, 500)

  useEffect(() => {
    if (!currentUser) return

    getCurrentUser({
      variables: {
        id: currentUser.uid,
      },
    })
  }, [currentUser])

  useEffect(() => {
    if (!id) return

    getProjectById({
      variables: {
        id,
      },
    })
  }, [id])

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

  const handleInvitation = async (userId: string, projectId: string) => {
    await createInvitation({
      variables: {
        userId,
        projectId,
      },
    })
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
  const { anchorEl } = useCompleteAnimation<HTMLDivElement>(json)
  return (
    <>
      <LazyLoading />
      {isComplete && <TaskCompleteAnimation ref={anchorEl} />}
      <ProjectDetailHeader
        iconImage={String(currentUserData.data?.user.icon_image)}
        name={String(currentUserData.data?.user.name)}
        uid={String(currentUserData.data?.user.id)}
        totalExp={Number(currentUserData.data?.user.exp)}
        company={String(currentUserData.data?.user.company)}
        notifications={notifications}
        list={list}
      />
      <StyledProjectDetailContainer>
        <StyledProjectDetailLeftContainer>
          <ProjectDrawer
            groups={projectData.data?.getProjectById.groups}
            lists={list}
            onDragEnd={onDragEnd}
          />
          {!!currentUserData.data && (
            <ProjectMyInfo
              {...currentUserData.data.user}
              iconImage={currentUserData.data.user.icon_image}
              occupation={currentUserData.data.user.occupation.name}
              totalExp={currentUserData.data.user.exp}
            />
          )}
        </StyledProjectDetailLeftContainer>
        <StyledProjectDetailRightContainer>
          <ProjectRight
            onClick={handleCreateList}
            monsterHPRemaining={monsterHPRemaining}
            monsterHp={monsterTotalHP}
            monsterName={projectData.data?.getProjectById.monster.name ?? ''}
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
const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
`
const StyledAnimation = styled.div`
  width: 100%;
  height: 100%;
`
