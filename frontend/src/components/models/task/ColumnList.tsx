import React, { FC } from 'react'
import { List } from 'types/list'
import { Column } from 'components/models/task/Column'

type Props = {
  className?: string
  lists: List[]
}

export const ColumnList: FC<Props> = ({ lists }) => {
  return (
    <>
      {lists.map((list, listIndex, { length }) => (
        <Column
          key={list.id}
          id={list.id}
          listIndex={listIndex}
          listLength={length}
          title={list.title}
          tasks={list.tasks}
        />
      ))}
    </>
  )
}
