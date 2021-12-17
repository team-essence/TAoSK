import React, { FCX } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { StyledMaterialUiMain } from 'styles/mui/StyledMaterialUiMain'
import { DROP_TYPE } from 'consts/dropType'
import { List } from 'types/list'
import { GetProjectQuery } from 'pages/projectDetail/projectDetail.gen'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateVwBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { EmployeeProjectMembers } from 'components/models/employee/EmployeeProjectMembers'
import { EmployeeSignBoard } from 'components/models/employee/EmployeeSignBoard'
import { TaskColumnList } from 'components/models/task/TaskColumnList'
import Drawer from '@mui/material/Drawer'
import styled, { css } from 'styled-components'

type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>

type Props = {
  lists: List[]
  onDragEnd: (result: DropResult) => Promise<void>
} & Partial<Groups>

export const ProjectDrawer: FCX<Props> = ({ groups, lists, onDragEnd }) => {
  const { currentValue, setCurrentValue } = useLocalStorage<boolean>('isOpen', true)

  return (
    <StyledContainer>
      <Drawer sx={StyledDrawer} variant="persistent" anchor="left" open={currentValue}>
        <EmployeeProjectMembers groups={groups} />
      </Drawer>
      <StyledMaterialUiMain open={currentValue}>
        <StyledMainWrap isOpen={currentValue}>
          <SignBoardContainer>
            <EmployeeSignBoard
              isOpen={currentValue}
              handleClick={() => setCurrentValue(!currentValue)}
            />
          </SignBoardContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type={DROP_TYPE.COLUMN}>
              {provided => (
                <StyledColumnContainer ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskColumnList lists={lists} />
                  {provided.placeholder}
                </StyledColumnContainer>
              )}
            </Droppable>
          </DragDropContext>
        </StyledMainWrap>
      </StyledMaterialUiMain>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
`
const StyledColumnContainer = styled(StyledContainer)`
  padding-bottom: ${calculateMinSizeBasedOnFigmaWidth(32)};
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(250, 250, 250, 0.6);
    border-radius: 10px;
  }
`
const SignBoardContainer = styled.div`
  position: relative;
  top: ${calculateMinSizeBasedOnFigmaWidth(8)};
`
const StyledMainWrap = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(16)};
  // TODO: リスト全体のwidthを指定するとモニターとPCで幅が合わない
  ${({ isOpen }) =>
    isOpen
      ? css`
          width: ${calculateVwBasedOnFigma(946)};
        `
      : css`
          width: ${calculateVwBasedOnFigma(1156)};
        `}
`
const StyledDrawer = {
  width: calculateMinSizeBasedOnFigmaWidth(210),
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    position: 'static',
    width: calculateMinSizeBasedOnFigmaWidth(210),
    border: 'none',
    backgroundColor: 'inherit',
    overflowX: 'hidden',
  },
}
