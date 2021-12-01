import React, { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { List } from 'types/list'
import { DropType } from 'consts/dropType'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { TaskList } from 'components/models/task/TaskList'
import { AddTaskButton } from 'components/models/task/AddTaskButton'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
  listIndex: number
  listLength: number
  handleAddTask: (list_id: number) => void
} & Omit<List, 'list_id' | 'sort_id' | 'index'>

export const Column: FC<Props> = ({ id, title, tasks, listIndex, listLength, handleAddTask }) => {
  return (
    <Draggable
      draggableId={`column-${id}`}
      index={listIndex}
      isDragDisabled={listIndex === 0 || listLength - 1 === listIndex}>
      {provided => (
        <StyledContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Droppable droppableId={String(listIndex)} type={DropType.TASK}>
            {listProvided => (
              <StyledColumnContainer ref={listProvided.innerRef} {...listProvided.droppableProps}>
                <StyledHeadCotanier listIndex={listIndex} listLength={listLength}>
                  <StyledInnerHeadWrap>
                    <StyledTitle>{title}</StyledTitle>
                    <img src="/svg/spread.svg" alt="spread" width="12" />
                  </StyledInnerHeadWrap>
                </StyledHeadCotanier>
                <StyledTaskListContainer>
                  {listIndex === 0 && (
                    <StyledButtonContainer>
                      <AddTaskButton handleAddTask={handleAddTask} />
                    </StyledButtonContainer>
                  )}
                  <TaskList tasks={tasks} listIndex={listIndex} listLength={listLength} />
                </StyledTaskListContainer>
                {listProvided.placeholder}
              </StyledColumnContainer>
            )}
          </Droppable>
        </StyledContainer>
      )}
    </Draggable>
  )
}

const StyledContainer = styled.div`
  margin-right: ${calculateMinSizeBasedOnFigmaWidth(16)};
`
const StyledColumnContainer = styled.ul`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(270)};
  min-height: ${calculateMinSizeBasedOnFigmaWidth(200)};
  border: 1px solid ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.PEARL_BUSH};
  box-shadow: -8px 8px 2px rgba(0, 0, 0, 0.5);
  &::after {
    content: '';
    border: 2px solid ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 3px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
  }
`
const StyledHeadCotanier = styled.div<{ listIndex: number; listLength: number }>`
  position: relative;
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  height: ${calculateMinSizeBasedOnFigmaWidth(48)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(1)};
  border-radius: 2px;
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
const StyledButtonContainer = styled.div`
  padding-bottom: ${calculateMinSizeBasedOnFigmaWidth(8)};
`
// 改行でts-styled-pluginのエラーが出る為変数に格納
const avoidTsStyledErr = `${calculateMinSizeBasedOnFigmaWidth(
  16,
)} ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(8)}`
const StyledTaskListContainer = styled.div`
  padding: ${avoidTsStyledErr};
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
