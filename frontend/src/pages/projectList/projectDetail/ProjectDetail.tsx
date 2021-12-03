import React, { FC, useEffect, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useAuthContext } from 'providers/AuthProvider'
import { useGetCurrentUserLazyQuery } from './getUser.gen'
import {
  useGetProjectLazyQuery,
  useUpdateOnlineFlagMutation,
  useCreateInvitationMutation,
  useUpdateTaskSortMutation,
  useAddTaskMutation,
  useCreateListMutation,
  useUpdateListSortMutation,
} from './projectDetail.gen'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import logger from 'utils/debugger/logger'
import toast from 'utils/toast/toast'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { useSearchSameCompanyUsersMutation } from '../projectList.gen'
import { List } from 'types/list'
import { Task } from 'types/task'
import { DropType } from 'consts/dropType'
import { TaskCreateModal } from 'components/models/task/TaskCreateModal'
import { TaskCard } from 'components/models/task/TaskCard'
import { ColumnList } from 'components/models/task/ColumnList'
import { ProjectCreateListButton } from 'components/models/project/ProjectCreateListButton'
import { ProjectRight } from 'components/models/project/ProjectRight'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { Loading } from 'components/ui/loading/Loading'
import { GameLogType } from 'types/gameLog'

export const ProjectDetail: FC = () => {
  resetServerContext()
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const inputUserName = useInput('')
  const [getProjectById, projectData] = useGetProjectLazyQuery({
    onCompleted(data) {
      data.getProjectById.groups.map(group => {
        setSelectUserIds(groupList => [...groupList, group.user.id])
      })

      data.getProjectById.gameLogs.map(gameLog => {
        const time = new Date(gameLog.created_at)
        const init = {
          context: gameLog.context,
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
  })
  const [getCurrentUser, currentUserData] = useGetCurrentUserLazyQuery({})
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
  const [addTask] = useAddTaskMutation({
    onCompleted(data) {
      toast.success('タスクを作成しました')
    },
    onError(err) {
      toast.error('タスクの作成失敗しました')
    },
  })
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)

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

    if (type === DropType.COLUMN) {
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

    const updateTasks = sortListCopy.map(list => {
      return list.tasks.map((task, taskIndex) => {
        return {
          id: task.id,
          list_id: list.id,
          vertical_sort: taskIndex,
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
          project_id: id as string,
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

  const handleAddTask = (list_id: number) => {
    addTask({
      variables: {
        newTask: {
          title:
            '心拍数と集中力を測定してfirestore上に送れるようにする心拍数と集中力を測定してfirestore上に送れるようにする',
          overview: 'hoge',
          // 一旦ステータスはランダムにした
          technology: Math.floor(Math.random() * 11),
          achievement: Math.floor(Math.random() * 11),
          solution: Math.floor(Math.random() * 11),
          motivation: Math.floor(Math.random() * 11),
          plan: Math.floor(Math.random() * 11),
          design: Math.floor(Math.random() * 11),
          vertical_sort: list[list_id].tasks.length,
          end_date: '2021/12/30',
          project_id: id as string,
          list_id: String(list_id),
        },
      },
    })
  }

  const handleCreateList = async () => {
    await createList({
      variables: {
        name: 'ほげ',
        project_id: Number(id),
        task_list: 1,
      },
    })
  }

  if (!projectData.data) return <Loading />

  return (
    <ProjectDetailContainer>
      <ProjectTitleContainer>
        プロジェクト詳細
        <button style={{ border: 'solid' }}>招待</button>
        <input type="text" {...inputUserName} placeholder="ユーザ名" />
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
          <h2>オンライン</h2>
          {projectData.data?.getProjectById.groups.map(
            (group, index) =>
              group.user.online_flg && (
                <div key={index}>
                  <p>{group.user.name}</p>
                  <p>{group.user.icon_image}</p>
                  <p>{group.user.id}</p>
                  <p>{group.user.mp}</p>
                  <p>{group.user.hp}</p>
                  <p>{group.user.occupation_id}</p>
                  <p>{JSON.stringify(group.user.online_flg)}</p>
                </div>
              ),
          )}
          <h2>オフライン</h2>
          {projectData.data?.getProjectById.groups.map(
            (group, index) =>
              !group.user.online_flg && (
                <div key={index}>
                  <p>{group.user.name}</p>
                  <p>{group.user.icon_image}</p>
                  <p>{group.user.id}</p>
                  <p>{group.user.mp}</p>
                  <p>{group.user.hp}</p>
                  <p>{group.user.occupation_id}</p>
                  <p>{JSON.stringify(group.user.online_flg)}</p>
                </div>
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

        <div style={{ border: 'solid' }}></div>

        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type={DropType.COLUMN}>
              {provided => (
                <StyledTaskListContainer ref={provided.innerRef} {...provided.droppableProps}>
                  <ColumnList lists={list} handleAddTask={handleAddTask} />
                  {provided.placeholder}
                </StyledTaskListContainer>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </ProjectDetailLeftContainer>

      <ProjectDetailRightContainer>
        <ProjectRight
          onClick={handleCreateList}
          monsterHp={projectData.data.getProjectById.hp}
          monsterName={projectData.data.getProjectById.monster.name}
          gameLogs={logs}
        />
      </ProjectDetailRightContainer>

      <TaskCreateModal shouldShow={shouldShowModal} setShouldShow={setShouldShowModal} />
    </ProjectDetailContainer>
  )
}

const ProjectDetailContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: auto ${calculateMinSizeBasedOnFigmaWidth(283)};
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
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`

const StyledTaskListContainer = styled.div`
  display: flex;
`
