import React, { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { List } from 'types/list'
import { DropType } from 'consts/dropType'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { TaskList } from 'components/models/task/TaskList'
import styled from 'styled-components'

type Props = {
  className?: string
  listIndex: number
  listLength: number
  // handleAddTask: () => void
} & Omit<List, 'list_id' | 'sort_id' | 'index'>

export const Column: FC<Props> = ({ id, title, tasks, listIndex, listLength }) => {
  return (
    <Draggable
      draggableId={`column-${id}`}
      index={listIndex}
      isDragDisabled={listIndex === 0 || listLength - 1 === listIndex}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {/* <button onClick={() => handleAddTask(listIndex + 1)}>追加</button> */}
          <Droppable droppableId={String(listIndex)} type={DropType.TASK}>
            {listProvided => (
              <StyledColumnContainer
                ref={listProvided.innerRef}
                {...listProvided.droppableProps}
                style={{
                  // width: '400px',
                  // border: 'solid',
                  minHeight: '300px',
                  // padding: '20px',
                }}>
                <h2>{title}</h2>
                <TaskList tasks={tasks} listIndex={listIndex} listLength={listLength} />
                {listProvided.placeholder}
              </StyledColumnContainer>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

const StyledColumnContainer = styled.ul`
  width: ${calculateMinSizeBasedOnFigmaWidth(270)};
  border: 1px solid ${({ theme }) => theme.COLORS.MONDO};
  border-radius: 3px;
`
