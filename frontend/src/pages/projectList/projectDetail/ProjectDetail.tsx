import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DropResult, resetServerContext } from 'react-beautiful-dnd'
import styled, { css } from 'styled-components'
import { useAuthContext } from 'providers/AuthProvider'
import { useGetCurrentUserLazyQuery } from './getUser.gen'
import { useSearchSameCompanyUsersMutation } from '../projectList.gen'
import {
  useGetProjectLazyQuery,
  useUpdateOnlineFlagMutation,
  useCreateInvitationMutation,
  useUpdateTaskSortMutation,
  useCreateListMutation,
  useUpdateListSortMutation,
} from './projectDetail.gen'
import logger from 'utils/debugger/logger'
import toast from 'utils/toast/toast'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { List } from 'types/list'
import { Task } from 'types/task'
import { GameLogType } from 'types/gameLog'
import { DROP_TYPE } from 'consts/dropType'
import { ProjectDrawer } from 'components/models/project/ProjectDrawer'
import { ProjectRight } from 'components/models/project/ProjectRight'
import { ProjectMyInfo } from 'components/models/project/ProjectMyInfo'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { Loading } from 'components/ui/loading/Loading'
import { ProjectDetailHeader } from 'components/ui/header/ProjectDetailHeader'
import { Notifications } from 'types/notification'

export const ProjectDetail: FC = () => {
  resetServerContext()
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const [notifications, setNotifications] = useState<Notifications>([])
  const inputUserName = useInput('')
  const [getProjectById, projectData] = useGetProjectLazyQuery({
    onCompleted(data) {
      data.getProjectById.groups.map(group => {
        setSelectUserIds(groupList => [...groupList, group.user.id])
      })

      data.getProjectById.gameLogs.map(gameLog => {
        const time = new Date(gameLog.created_at)
        logger.debug(gameLog)
        const init = {
          context: gameLog.context,
          // TODO: Redundant double negationが出たため`!!`が入力出来ず
          userName: gameLog.user.name,
          createdAt: time.getTime(),
        }
        setLogs(log => [...log, init].sort((a, b) => a.createdAt - b.createdAt))
      })

      const sortList: List[] = data.getProjectById.lists.map(list => {
        const tasks = list.tasks.map(task => {
          const allocations = task.allocations.map(allocation => {
            return {
              id: allocation.user.id,
              name: allocation.user.name,
              icon_image: allocation.user.icon_image,
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
  const [updateOnlineFlag] = useUpdateOnlineFlagMutation()
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
      toast.success('タスクを移動しました')
    },
    onError(err) {
      logger.debug(err)
      toast.error('タスクの移動に失敗しました')
    },
  })

  const [createList] = useCreateListMutation({
    onCompleted(data) {
      toast.success('リスト作成成功！')
      const newListData = data.createList

      const tasks = newListData.tasks.map(task => {
        const allocations = task.allocations.map(allocation => {
          return {
            id: allocation.user.id,
            name: allocation.user.name,
            icon_image: allocation.user.icon_image,
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
      toast.error('リスト作成失敗！')
    },
  })

  const [updateList] = useUpdateListSortMutation({
    onCompleted(data) {
      toast.success('リスト更新成功！')
    },
    onError(err) {
      toast.error('リスト更新失敗')
    },
  })

  const [list, setList] = useState<List[]>([])
  const [logs, setLogs] = useState<GameLogType[]>([])
  const debouncedInputText = useDebounce<string>(inputUserName.value, 500)

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

      getProjectById({
        variables: {
          id,
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
    const updateTasks = sortListCopy.map(list => {
      return list.tasks.map((task, taskIndex) => {
        return {
          id: task.id,
          list_id: list.id,
          vertical_sort: taskIndex,
          completed_flg: false,
        }
      })
    })

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
        name: 'ほげ',
        project_id: String(id),
        task_list: 1,
      },
    })
  }

  if (!projectData.data) return <Loading />

  return (
    <>
      <ProjectDetailHeader
        iconImage={currentUserData.data!.user.icon_image}
        name={currentUserData.data!.user.name}
        uid={currentUserData.data!.user.id}
        totalExp={currentUserData.data!.user.exp}
        company={currentUserData.data!.user.company}
        notifications={notifications}
        list={list}
      />

      <ProjectDetailContainer>
        <ProjectDetailLeftContainer>
          <ProjectDrawer
            groups={projectData.data?.getProjectById.groups}
            lists={list}
            onDragEnd={onDragEnd}
          />
          {!!currentUserData.data && (
            <ProjectMyInfo
              {...currentUserData.data.user}
              iconImage={currentUserData.data.user.icon_image}
              occupationId={currentUserData.data.user.occupation_id}
              totalExp={currentUserData.data.user.exp}
            />
          )}
        </ProjectDetailLeftContainer>
        <ProjectDetailRightContainer>
          <ProjectRight
            onClick={handleCreateList}
            monsterHp={projectData.data.getProjectById.hp}
            monsterName={projectData.data.getProjectById.monster.name}
            gameLogs={logs}
          />
        </ProjectDetailRightContainer>
      </ProjectDetailContainer>

      <StyledBackground />
    </>
  )
}

const ProjectDetailContainer = styled.div`
  padding-top: calc(
    ${({ theme }) => theme.HEADER_HEIGHT} + ${calculateMinSizeBasedOnFigmaWidth(8)}
  );
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: auto ${calculateMinSizeBasedOnFigmaWidth(283)};
  grid-template-rows: auto 1fr;
`

const ProjectDetailLeftContainer = styled.div`
  height: 100%;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  overflow-x: auto;
  white-space: nowrap;
`

const ProjectDetailRightContainer = styled.div`
  height: 100%;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`

const StyledTaskListContainer = styled.div`
  display: flex;
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
