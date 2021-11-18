import React, { FC, useEffect, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { useAuthContext } from 'context/AuthProvider'
import { useGetCurrentUserLazyQuery } from './getUser.gen'
import {
  useGetProjectMutation,
  useUpdateOnlineFlagMutation,
  useCreateInvitationMutation,
  useGetListsByProjectIdLazyQuery,
  useUpdateTaskSortMutation,
  useAddTaskMutation,
} from './projectDetail.gen'
import styled from 'styled-components'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import logger from 'utils/debugger/logger'
import { group } from 'console'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { useSearchSameCompanyUsersMutation } from '../projectList.gen'
import toast from 'utils/toast/toast'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { listType, tasksType } from 'models/list'
import { UpdateTask } from 'types/graphql.gen'
import date from 'utils/date/date'

export const ProjectDetail: FC = () => {
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const inputUserName = useInput('')
  const [getProjectById, projectData] = useGetProjectMutation({
    onCompleted(data) {
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
  const [updateTaskSort] = useUpdateTaskSortMutation({
    onCompleted(data) {
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

  const [list, setList] = useState<listType[]>([])
  const [getListsByProjectId] = useGetListsByProjectIdLazyQuery({
    onCompleted(data) {
      const sortList: listType[] = data.listsByProjectId.map(list => {
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
            overview: task.overview,
            explanation: task.explanation,
            technology: task.technology,
            achievement: task.achievement,
            solution: task.solution,
            motivation: task.motivation,
            plan: task.plan,
            design: task.design,
            weight: task.weight,
            vertical_sort: task.vertical_sort,
            end_date: task.end_date,
            allocations,
          }
        })

        return {
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

      getListsByProjectId({
        variables: {
          projectId: id,
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

  const removeFromList = (list: tasksType[], index: number): [tasksType, tasksType[]] => {
    const result = Array.from(list)
    const [removed] = result.splice(index, 1)
    return [removed, result]
  }

  const addToList = (list: tasksType[], index: number, element: tasksType) => {
    const result = Array.from(list)
    result.splice(index, 0, element)
    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result
    const destinationDroppableId = Number(destination.droppableId)
    const sourceDroppableId = Number(source.droppableId)

    const listCopy = [...list]

    const [removedElement, newSourceList] = removeFromList(
      listCopy[sourceDroppableId].tasks,
      source.index,
    )

    listCopy[sourceDroppableId].tasks = newSourceList

    const destinationTask = listCopy[destinationDroppableId].tasks
    listCopy[destinationDroppableId].tasks = addToList(
      destinationTask,
      destination.index,
      removedElement,
    ) as any

    const sortListCopy = listCopy.map(list => {
      const sortList = list.tasks.map((task, index) => {
        task.vertical_sort = index
        return task
      })
      return sortList
    })

    const updateTasks = sortListCopy.map((tasks, listIndex) => {
      return tasks.map((task, taskIndex) => {
        return {
          id: task.id,
          list_id: String(listIndex + 1),
          vertical_sort: taskIndex,
        }
      })
    })

    const joinUpdateTasks = []
    for (let index = 0; index < updateTasks.length; index++) {
      joinUpdateTasks.push(...updateTasks[index])
    }

    updateTaskSort({
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

  const handleAddTask = async (list_id: number) => {
    addTask({
      variables: {
        newTask: {
          overview: 'hoge',
          explanation: 'hogehoge',
          technology: 0,
          achievement: 0,
          solution: 0,
          motivation: 0,
          plan: 0,
          design: 0,
          weight: 0,
          vertical_sort: list[list_id].tasks.length,
          end_date: '2021-12-23',
          project_id: id as string,
          list_id: String(list_id),
        },
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
          <h2>オンライン</h2>
          {projectData.data?.getProjectById.groups.map(
            group =>
              group.user.online_flg && (
                <>
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
          <h2>オフライン</h2>
          {projectData.data?.getProjectById.groups.map(
            group =>
              !group.user.online_flg && (
                <>
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

        <div style={{ border: 'solid' }}></div>

        <div style={{ display: 'flex' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {list.map((list, listIndex) => (
              <div key={listIndex}>
                {list.title}
                <button onClick={() => handleAddTask(listIndex + 1)}>追加</button>
                <ul style={{ width: '300px', border: 'solid', minHeight: '300px' }}>
                  <Droppable droppableId={String(list.index)}>
                    {listProvided => (
                      <div
                        {...listProvided.droppableProps}
                        ref={listProvided.innerRef}
                        style={{ width: '300px', minHeight: '300px' }}>
                        {list.tasks.map((task, taskIndex) => (
                          <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                            {taskProvided => (
                              <li
                                ref={taskProvided.innerRef}
                                {...taskProvided.draggableProps}
                                {...taskProvided.dragHandleProps}>
                                <div>
                                  <h2>{task.overview}</h2>
                                </div>
                                <div>
                                  <h4>期限</h4>
                                  <p>
                                    {date.isYesterday(task.end_date)
                                      ? 'red'
                                      : date.isThreeDaysAgo(task.end_date)
                                      ? 'yellow'
                                      : 'ノーマル'}
                                  </p>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </ul>
              </div>
            ))}
          </DragDropContext>
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
