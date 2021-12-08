import React, { FC } from 'react'
import { Task } from 'types/task'
import { TaskCard } from 'components/models/task/TaskCard'

type Props = {
  className?: string
  listIndex: number
  listLength: number
  tasks: Task[]
}

export const TaskList: FC<Props> = ({ tasks, listIndex, listLength }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          taskIndex={index}
          listIndex={listIndex}
          listLength={listLength}
          {...task}
        />
      ))}
    </>
  )
}
