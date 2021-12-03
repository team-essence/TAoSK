import React, { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { List } from 'types/list'
import { DROP_TYPE } from 'consts/dropType'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { useInput } from 'hooks/useInput'
import { usePopover } from 'hooks/usePopover'
import { useControllTextArea } from 'hooks/useControlTextArea'
import {
  useUpdateListNameMutation,
  useRemoveListMutation,
} from 'pages/projectList/projectDetail/projectDetail.gen'
import { TaskList } from 'components/models/task/TaskList'
import { CreateTaskButton } from 'components/models/task/CreateTaskButton'
import { SmallPopover } from 'components/models/task/SmallPopover'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
  listIndex: number
  listLength: number
  handleAddTask: (list_id: number) => void
} & Omit<List, 'sort_id' | 'index'>

export const Column: FC<Props> = ({
  id,
  list_id,
  title,
  tasks,
  listIndex,
  listLength,
  handleAddTask,
}) => {
  const listTitle = useInput(title)
  const controll = useControllTextArea()
  const { anchorEl, openPopover, closePopover } = usePopover()
  const [updateListName] = useUpdateListNameMutation()
  const [removeList] = useRemoveListMutation()

  const handleEnableTextArea = (e?: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    if (listIndex === 0 || listIndex === listLength - 1 || !e) return
    controll.enableTextArea(e)
  }

  const handleUpdateListName = (
    e: React.KeyboardEvent | React.FocusEvent,
    name: string,
    list_id: string,
  ) => {
    if (('key' in e && e.key === 'Enter') || e.type === 'blur') {
      updateListName({ variables: { name, list_id } })
      controll.disableTextArea()
    }
  }

  const handleRemoveList = (id: number) => {
    removeList({ variables: { id } })
  }

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
          <Droppable droppableId={String(listIndex)} type={DROP_TYPE.TASK}>
            {listProvided => (
              <StyledColumnContainer ref={listProvided.innerRef} {...listProvided.droppableProps}>
                <StyledHeadCotanier listIndex={listIndex} listLength={listLength}>
                  <StyledInnerHeadWrap>
                    <StyledTitle onClick={e => handleEnableTextArea(e)}>
                      <StyledTitleTextArea
                        {...listTitle}
                        ref={controll.textAreaRef}
                        disabled={controll.isDisabled}
                        onKeyDown={e =>
                          handleUpdateListName(
                            e,
                            listTitle.value ? listTitle.value : title,
                            list_id,
                          )
                        }
                        onBlur={e =>
                          handleUpdateListName(
                            e,
                            listTitle.value ? listTitle.value : title,
                            list_id,
                          )
                        }
                        onFocus={controll.makeAllTextSelected}
                        minRows={1}
                        maxLength={255}
                      />
                    </StyledTitle>
                    {listIndex !== 0 && listIndex !== listLength - 1 && (
                      <>
                        <StyledSpreadIcon
                          src="/svg/spread.svg"
                          alt="spread"
                          onClick={openPopover}
                        />
                        <SmallPopover
                          anchorEl={anchorEl}
                          vertical="bottom"
                          horizontal="left"
                          handleClose={closePopover}
                          handleEdit={controll.enableTextArea}
                          handleRemove={() => handleRemoveList(Number(id))}
                        />
                      </>
                    )}
                  </StyledInnerHeadWrap>
                </StyledHeadCotanier>
                <StyledTaskListContainer>
                  {listIndex === 0 && (
                    <StyledButtonContainer>
                      <CreateTaskButton handleAddTask={handleAddTask} />
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
  display: flex;
  position: relative;
  min-height: ${calculateMinSizeBasedOnFigmaWidth(48)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(1)};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
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
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
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
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(14)};
  border: 2px solid ${({ theme }) => theme.COLORS.STARK_WHITE};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`
const StyledTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledTitleTextArea = styled(TextareaAutosize)`
  display: block;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  max-height: auto;
  color: ${({ theme }) => theme.COLORS.BLACK};
  border: none;
  border-radius: 2px;
  resize: none;
  margin: ${calculateMinSizeBasedOnFigmaWidth(4)} 0;
  :disabled {
    color: ${({ theme }) => theme.COLORS.WHITE};
    background: inherit;
  }
  :focus {
    outline: 0;
  }
`
const StyledSpreadIcon = styled.img`
  display: block;
  width: ${calculateMinSizeBasedOnFigmaWidth(12)};
  cursor: pointer;
  min-height: ${calculateMinSizeBasedOnFigmaWidth(40)};
`
