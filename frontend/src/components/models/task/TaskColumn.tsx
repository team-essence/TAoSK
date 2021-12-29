import React, { FCX, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { List } from 'types/list'
import { DROP_TYPE } from 'consts/dropType'
import { theme } from 'styles/theme'
import toast from 'utils/toast/toast'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import {
  calculateVhBasedOnFigma,
  calculateMinSizeBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import {
  useUpdateListNameMutation,
  useRemoveListMutation,
} from 'pages/projectDetail/projectDetail.gen'
import { TaskCreateModal } from 'components/models/task/TaskCreateModal'
import { useInput } from 'hooks/useInput'
import { usePopover } from 'hooks/usePopover'
import { useControlTextArea } from 'hooks/useControlTextArea'
import { useWatchElementAspect } from 'hooks/useWatchElementAspect'
import { TaskList } from 'components/models/task/TaskList'
import { CreateTaskButton } from 'components/ui/button/CreateTaskButton'
import { SmallPopover } from 'components/ui/popup/SmallPopover'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import styled, { css } from 'styled-components'
import { useParams } from 'react-router-dom'
import logger from 'utils/debugger/logger'

type Props = {
  listIndex: number
  listLength: number
  isCompletedProject: boolean
} & Omit<List, 'sort_id' | 'index'>

export const TaskColumn: FCX<Props> = ({
  id,
  list_id,
  title,
  tasks,
  listIndex,
  listLength,
  isCompletedProject,
}) => {
  const listTitle = useInput(title)
  const control = useControlTextArea()
  const { id: projectId } = useParams()
  const { sizeInspectedEl, height } = useWatchElementAspect<HTMLDivElement>()
  const { anchorEl, openPopover, closePopover } = usePopover()
  const [updateListName] = useUpdateListNameMutation()
  const [removeList] = useRemoveListMutation()
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)

  const handleEnableTextArea = (e?: React.MouseEvent<HTMLElement>) => {
    if (listIndex === 0 || listIndex === listLength - 1 || !e) return
    control.enableTextArea(e)
  }

  const handleUpdateListName = (
    e: React.KeyboardEvent | React.FocusEvent,
    name: string,
    list_id: string,
  ) => {
    if (('key' in e && e.key === 'Enter') || e.type === 'blur') {
      updateListName({ variables: { name, list_id } })
      control.disableTextArea()
    }
  }

  const handleRemoveList = (id: number, projectId: string) => {
    logger.debug(projectId)
    removeList({ variables: { id, project_id: projectId } })
      .then(() => toast.success(`${title}を削除しました`))
      .catch(() => toast.error(`${title}の削除に失敗しました`))
  }

  if (!projectId) return <></>

  return (
    <Draggable
      draggableId={`column-${id}`}
      index={listIndex}
      isDragDisabled={listIndex === 0 || listLength - 1 === listIndex || isCompletedProject}>
      {provided => (
        <StyledContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Droppable droppableId={String(listIndex)} type={DROP_TYPE.TASK}>
            {listProvided => (
              <StyledColumnContainer ref={listProvided.innerRef} {...listProvided.droppableProps}>
                <StyledHeadContainer
                  ref={sizeInspectedEl}
                  listIndex={listIndex}
                  listLength={listLength}>
                  <StyledInnerHeadWrap>
                    <StyledTitle onClick={e => handleEnableTextArea(e)}>
                      <StyledTitleTextArea
                        {...listTitle}
                        ref={control.textAreaRef}
                        disabled={control.isDisabled}
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
                        onFocus={control.makeAllTextSelected}
                        minRows={1}
                        maxLength={255}
                      />
                    </StyledTitle>
                    {listIndex !== 0 && listIndex !== listLength - 1 && listLength !== 3 && (
                      <>
                        <StyledSpreadIcon
                          src="/svg/spread.svg"
                          alt="spread"
                          onClick={openPopover}
                        />
                        <SmallPopover
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          handleClose={closePopover}
                          handleRemove={() => handleRemoveList(Number(id), projectId)}
                          handleEdit={e => !!e && control.enableTextArea(e)}
                        />
                      </>
                    )}
                  </StyledInnerHeadWrap>
                </StyledHeadContainer>
                <StyledTaskListContainer headerHeight={height}>
                  {listIndex === 0 && (
                    <>
                      <StyledButtonContainer>
                        <CreateTaskButton
                          onClick={() => setShouldShowModal(true)}
                          disabled={isCompletedProject}
                        />
                      </StyledButtonContainer>
                      <TaskCreateModal
                        shouldShow={shouldShowModal && !isCompletedProject}
                        closeModal={() => setShouldShowModal(false)}
                        verticalSort={tasks.length}
                        list_id={list_id}
                      />
                    </>
                  )}
                  <TaskList
                    tasks={tasks}
                    listIndex={listIndex}
                    listLength={listLength}
                    isCompletedProject={isCompletedProject}
                  />
                  {listProvided.placeholder}
                </StyledTaskListContainer>
              </StyledColumnContainer>
            )}
          </Droppable>
        </StyledContainer>
      )}
    </Draggable>
  )
}

const StyledColumnContainer = styled.ul`
  position: relative;
  width: ${calculateMinSizeBasedOnFigma(280)};
  min-height: ${calculateMinSizeBasedOnFigma(206)};
  border: 1px solid ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.PEARL_BUSH};
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
const StyledHeadContainer = styled.div<{ listIndex: number; listLength: number }>`
  display: flex;
  position: relative;
  min-height: ${calculateMinSizeBasedOnFigma(48)};
  padding: ${calculateMinSizeBasedOnFigma(1.2)};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  ${({ listIndex, listLength, theme }) =>
    listIndex === 0
      ? css`
          background-color: ${theme.COLORS.OLIVE_GREEN};
        `
      : listIndex < listLength && listIndex !== listLength - 1
      ? css`
          background-color: ${theme.COLORS.SHIP_COVE};
        `
      : css`
          background-color: ${theme.COLORS.BOULDER};
        `}
  z-index: ${theme.Z_INDEX.INDEX_1};
`
const StyledButtonContainer = styled.div`
  padding-bottom: ${calculateMinSizeBasedOnFigma(8)};
`
const maxListHeight = 628
const StyledContainer = styled.div`
  margin-right: ${calculateMinSizeBasedOnFigma(16)};
  max-height: ${calculateVhBasedOnFigma(maxListHeight)};
`
const StyledTaskListContainer = styled.div<{ headerHeight: number }>`
  max-height: ${({ headerHeight }) => `${calculateVhBasedOnFigma(maxListHeight - headerHeight)}`};
  padding: ${calculateMinSizeBasedOnFigma(16)} ${calculateMinSizeBasedOnFigma(8)} 0;
  margin-bottom: ${calculateMinSizeBasedOnFigma(4)};
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.COLORS.SWIRL};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.COTTON_SEED};
  }
`
const StyledInnerHeadWrap = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${calculateMinSizeBasedOnFigma(14)};
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
  margin: ${calculateMinSizeBasedOnFigma(4)} 0;
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
  width: ${calculateMinSizeBasedOnFigma(12)};
  cursor: pointer;
  min-height: ${calculateMinSizeBasedOnFigma(40)};
`
