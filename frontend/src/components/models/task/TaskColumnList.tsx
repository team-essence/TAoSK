import React, { FCX } from 'react'
import { List } from 'types/list'
import { TaskColumn } from 'components/models/task/TaskColumn'

type Props = {
  lists: List[]
  isCompletedProject: boolean
}

export const TaskColumnList: FCX<Props> = ({ lists, isCompletedProject }) => {
  return (
    <>
      {lists.map((list, listIndex, { length }) => (
        <TaskColumn
          key={list.id}
          listIndex={listIndex}
          listLength={length}
          isCompletedProject={isCompletedProject}
          {...list}
        />
      ))}
    </>
  )
}
