import React, { FC } from 'react'
import { List } from 'types/list'
import { TaskColumn } from 'components/models/task/TaskColumn'

type Props = {
  className?: string
  lists: List[]
  handleAddTask: (list_id: number) => void
}

export const TaskColumnList: FC<Props> = ({ lists, handleAddTask }) => {
  return (
    <>
      {lists.map((list, listIndex, { length }) => (
        <TaskColumn
          key={list.id}
          id={list.id}
          list_id={list.list_id}
          listIndex={listIndex}
          listLength={length}
          title={list.title}
          tasks={list.tasks}
          handleAddTask={handleAddTask}
        />
      ))}
    </>
  )
}
