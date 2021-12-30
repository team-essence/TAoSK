import React, { FCX } from 'react'
import { Task } from 'types/task'
import { Groups } from 'types/groups'
import { TaskCard } from 'components/models/task/TaskCard'

type Props = {
  listIndex: number
  listLength: number
  tasks: Task[]
} & Groups

export const TaskList: FCX<Props> = ({ tasks, listIndex, listLength, groups }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          taskIndex={index}
          listIndex={listIndex}
          listLength={listLength}
          groups={groups}
          {...task}
        />
      ))}
    </>
  )
}
