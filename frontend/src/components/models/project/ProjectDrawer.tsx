import React, { FC, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { StyledMaterialUiMain } from 'styles/mui/StyledMaterialUiMain'
import { DropType } from 'consts/dropType'
import { List } from 'types/list'
import { GetProjectQuery } from 'pages/projectList/projectDetail/projectDetail.gen'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { EmployeeProjectMembers } from 'components/models/employee/EmployeeProjectMembers'
import { EmployeeSignBoard } from 'components/models/employee/EmployeeSignBoard'
import { TaskColumnList } from 'components/models/task/TaskColumnList'
import Drawer from '@mui/material/Drawer'
import styled from 'styled-components'

type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>

type Props = {
  lists: List[]
  onDragEnd: (result: DropResult) => Promise<void>
  handleAddTask: (list_id: number) => void
} & Partial<Groups>

export const ProjectDrawer: FC<Props> = ({ groups, lists, onDragEnd, handleAddTask }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <StyledContainer>
      <Drawer sx={StyledDrawer} variant="persistent" anchor="left" open={isOpen}>
        <EmployeeProjectMembers groups={groups} />
      </Drawer>
      <StyledMaterialUiMain open={isOpen}>
        <StyledMainWrap>
          <EmployeeSignBoard isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type={DropType.COLUMN}>
              {provided => (
                <StyledContainer ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskColumnList lists={lists} handleAddTask={handleAddTask} />
                  {provided.placeholder}
                </StyledContainer>
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
const StyledMainWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${calculateMinSizeBasedOnFigmaWidth(16)};
`
const StyledDrawer = {
  width: calculateMinSizeBasedOnFigmaWidth(210),
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    position: 'static',
    width: calculateMinSizeBasedOnFigmaWidth(210),
    backgroundColor: 'inherit',
    overflowX: 'hidden',
  },
}
