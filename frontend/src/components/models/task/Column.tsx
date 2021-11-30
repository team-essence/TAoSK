import React, { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { List } from 'types/list'
import { DropType } from 'consts/dropType'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { TaskList } from 'components/models/task/TaskList'
import styled, { css } from 'styled-components'

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
              <StyledColumnContainer ref={listProvided.innerRef} {...listProvided.droppableProps}>
                <StyledHeadCotanier listIndex={listIndex} listLength={listLength}>
                  <StyledInnerHeadWrap>
                    <StyledTitle>{title}</StyledTitle>
                    <img src="/svg/spread.svg" alt="spread" width="12" />
                  </StyledInnerHeadWrap>
                </StyledHeadCotanier>
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
const StyledHeadCotanier = styled.div<{ listIndex: number; listLength: number }>`
  height: ${calculateMinSizeBasedOnFigmaWidth(48)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(1)};
  ${({ listIndex, listLength }) =>
    listIndex === 0
      ? css`
          background-color: ${({ theme }) => theme.COLORS.OLIVE_GREEN};
        `
      : listIndex < listLength && listIndex !== listLength - 1
      ? css`
          background-color: ${({ theme }) => theme.COLORS.SHIP_COVE};
        `
      : css`
          background-color: ${({ theme }) => theme.COLORS.BOULDER};
        `}
`
const StyledInnerHeadWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(14)};
  border: 2px solid ${({ theme }) => theme.COLORS.STARK_WHITE};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`
const StyledTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
