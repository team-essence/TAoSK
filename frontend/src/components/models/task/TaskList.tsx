import React, { FCX } from 'react'
import { Task } from 'types/task'
import { TaskCard } from 'components/models/task/TaskCard'

type Props = {
  listIndex: number
  listLength: number
  tasks: Task[]
  isCompletedProject: boolean
}

export const TaskList: FCX<Props> = ({ tasks, listIndex, listLength, isCompletedProject }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          taskIndex={index}
          listIndex={listIndex}
          listLength={listLength}
          isCompletedProject={isCompletedProject}
          {...task}
        />
      ))}
    </>
  )
}
