import React, { FCX } from 'react'
import { List } from 'types/list'
import { Groups } from 'types/groups'
import { TaskColumn } from 'components/models/task/TaskColumn'

type Props = {
  lists: List[]
  isCompletedProject: boolean
} & Groups

export const TaskColumnList: FCX<Props> = ({ lists, isCompletedProject, groups }) => {
  return (
    <>
      {lists.map((list, listIndex, { length }) => (
        <TaskColumn
          key={list.id}
          listIndex={listIndex}
          listLength={length}
          isCompletedProject={isCompletedProject}
          groups={groups}
          {...list}
        />
      ))}
    </>
  )
}
