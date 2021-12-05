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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { EmployeeOnlineStatusLabel } from 'components/models/employee/EmployeeOnlineStatusLabel'
import { EmployeeInformation } from 'components/models/employee/EmployeeInformation'
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
  const [open, setOpen] = React.useState(false)

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
        open={open}>
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
      <StyledMain open={open}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <StyledSignBoardContainer onClick={() => setOpen(!open)}>
            <StyledH3>MEMBER</StyledH3>
            <StyledFontAwesomeIcon icon={faCaretRight} />
          </StyledSignBoardContainer>
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
        </div>
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
const StyledSignBoardContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  padding: ${calculateMinSizeBasedOnFigmaWidth(4)};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  filter: drop-shadow(-4px 4px 2px rgba(0, 0, 0, 0.5));
  cursor: pointer;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  text-orientation: upright;
`
const StyledH3 = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
  color: ${({ theme }) => theme.COLORS.WHITE};
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
