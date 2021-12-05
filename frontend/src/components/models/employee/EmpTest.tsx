import * as React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { StyledMain } from 'styles/MainText'
import { DropType } from 'consts/dropType'
import { List } from 'types/list'
import { GetProjectQuery } from 'pages/projectList/projectDetail/projectDetail.gen'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateVhBasedOnFigma,
  calculateVwBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import { EmployeeOnlineStatusLabel } from 'components/models/employee/EmployeeOnlineStatusLabel'
import { EmployeeInformation } from 'components/models/employee/EmployeeInformation'
import { EmployeeSignBoard } from 'components/models/employee/EmployeeSignBoard'
import { TaskColumnList } from 'components/models/task/TaskColumnList'
import Drawer from '@mui/material/Drawer'
import styled from 'styled-components'

const drawerWidth = calculateMinSizeBasedOnFigmaWidth(210)
type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>
type Props = {
  lists: List[]
  onDragEnd: (result: DropResult) => Promise<void>
  handleAddTask: (list_id: number) => void
} & Partial<Groups>

export const EmpTest: React.FC<Props> = ({ groups, lists, onDragEnd, handleAddTask }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            position: 'static',
            width: drawerWidth,
            backgroundColor: 'inherit',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}>
        <StyledContaner>
          <StyledMemberContainer>
            <StyledLabelContainer>
              <EmployeeOnlineStatusLabel label="オンライン" status={true} />
            </StyledLabelContainer>
            {groups?.map(
              (group, index) =>
                !group.user.online_flg && (
                  <StyledEmployeeContainer key={index}>
                    <EmployeeInformation {...group.user} />
                  </StyledEmployeeContainer>
                ),
            )}
            <StyledLabelContainer>
              <EmployeeOnlineStatusLabel label="オフライン" status={false} />
            </StyledLabelContainer>
            {groups?.map(
              (group, index) =>
                !group.user.online_flg && (
                  <StyledEmployeeContainer key={index}>
                    <EmployeeInformation {...group.user} />
                  </StyledEmployeeContainer>
                ),
            )}
          </StyledMemberContainer>
        </StyledContaner>
      </Drawer>
      <StyledMain open={isOpen}>
        <StyledMainWrap>
          <EmployeeSignBoard isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type={DropType.COLUMN}>
              {provided => (
                <StyledTaskListContainer ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskColumnList lists={lists} handleAddTask={handleAddTask} />
                  {provided.placeholder}
                </StyledTaskListContainer>
              )}
            </Droppable>
          </DragDropContext>
        </StyledMainWrap>
      </StyledMain>
    </div>
  )
}

const StyledContaner = styled.div`
  display: flex;
  gap: ${calculateVhBasedOnFigma(8)};
  align-items: baseline;
`
const StyledMemberContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};
  height: ${calculateVhBasedOnFigma(680)};
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  overflow-x: hidden;
  overflow-y: auto;
`
const StyledMainWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${calculateMinSizeBasedOnFigmaWidth(16)};
`
const StyledEmployeeContainer = styled.div`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledLabelContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
`
const StyledTaskListContainer = styled.div`
  display: flex;
`
