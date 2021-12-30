import React, { FCX } from 'react'
import { List } from 'types/list'
import { Groups } from 'types/groups'
import { TaskColumn } from 'components/models/task/TaskColumn'

type Props = {
  lists: List[]
} & Groups

export const TaskColumnList: FCX<Props> = ({ lists, groups }) => {
  return (
    <>
      {lists.map((list, listIndex, { length }) => (
        <TaskColumn
          key={list.id}
          listIndex={listIndex}
          listLength={length}
          groups={groups}
          {...list}
        />
      ))}
    </>
  )
}
