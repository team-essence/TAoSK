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
          id={task.id}
          title={task.title}
          overview={task.overview}
          technology={task.technology}
          achievement={task.achievement}
          solution={task.solution}
          motivation={task.motivation}
          design={task.design}
          plan={task.plan}
          allocations={task.allocations}
          chatCount={task.chatCount}
          taskIndex={index}
          listIndex={listIndex}
          listLength={listLength}
          end_date={task.end_date}
        />
      ))}
    </>
  )
}
