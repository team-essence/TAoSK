import React, { FCX, Dispatch, SetStateAction } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { Modal } from 'components/ui/modal/Modal'
import { CalenderField } from 'components/ui/form/CalenderField'
import { SearchMemberField } from 'components/ui/form/SearchMemberField'
import { TaskEditTitleField } from 'components/models/task/TaskEditTitleField'
import { TaskEditOverviewField } from 'components/models/task/TaskEditOverviewField'
import { TaskEditStatusPointField } from 'components/models/task/TaskEditStatusPointField'
import { TaskCommentArea } from 'components/models/task/TaskCommentArea'
import { ConfirmPopup } from 'components/ui/popup/ConfirmPopup'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useTaskEndDateEditForm } from 'hooks/useTaskEndDateEditForm'
import { useTaskUserSelectForm } from 'hooks/useTaskUserSelectForm'
import { useModalInterlockingScroll } from 'hooks/useModalInterlockingScroll'
import { useDeleteTask } from 'hooks/useDeleteTask'
import { Task } from 'types/task'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
} & Omit<Task, 'vertical_sort'>

export const TaskEditModal: FCX<Props> = ({
  shouldShow,
  setShouldShow,
  className,
  id,
  title,
  overview,
  end_date,
  allocations,
  technology,
  solution,
  achievement,
  motivation,
  design,
  plan,
}) => {
  const { onChange, register } = useTaskEndDateEditForm({
    id,
    initialEndDate: end_date,
  })
  const { userData, setUserData } = useTaskUserSelectForm({ id, initialUserData: allocations })
  const { onClickDeleteButton, anchorEl, openPopover, closePopover } = useDeleteTask({
    id,
    setShouldShowEditModal: setShouldShow,
  })
  const {
    leftColumnRef,
    rightColumnRef,
    leftColumnInnerRef,
    rightColumnInnerRef,
    scrollableRef,
    scrollHeight,
  } = useModalInterlockingScroll()

  return (
    <>
      <StyledModal
        shouldShow={shouldShow}
        onClickCloseBtn={() => setShouldShow(false)}
        className={className}>
        <StyledTaskEditTitleField id={id} title={title} />
        <StyledContentsWrapper>
          <StyledLeftColumn ref={leftColumnRef}>
            <StyledLeftColumnInnerContents ref={leftColumnInnerRef}>
              <StyledTaskEditOverviewField id={id} overview={overview} />
              <StyledTaskCommentArea id={id} />
            </StyledLeftColumnInnerContents>
          </StyledLeftColumn>

          <StyledBorder />

          <StyledRightColumn ref={rightColumnRef}>
            <StyledRightColumnInnerContents ref={rightColumnInnerRef}>
              <StyledCalenderField
                label="期限"
                registration={register('date')}
                required={false}
                onChange={onChange}
              />
              <StyledSearchMemberField
                setUserData={setUserData}
                userData={userData}
                taskModalType="edit"
              />
              <StyledTaskEditStatusPointField
                id={id}
                technology={technology}
                solution={solution}
                achievement={achievement}
                motivation={motivation}
                design={design}
                plan={plan}
              />
              <StyledDeleteButtonWrapper>
                <StyledDeleteButton text="タスクを削除" onClick={openPopover} />
                <StyledConfirmPopup
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  title="カードを削除しますか?"
                  description="カードを削除するとカードを再び開くことができなくなります。この操作を元に戻すことはできません。"
                  buttonText="削除"
                  handleClose={closePopover}
                  onClickConfirmBtn={onClickDeleteButton}
                />
              </StyledDeleteButtonWrapper>
            </StyledRightColumnInnerContents>
          </StyledRightColumn>
        </StyledContentsWrapper>
      </StyledModal>

      {shouldShow && (
        <StyledScrollableOverlay ref={scrollableRef} onClick={() => setShouldShow(false)}>
          <StyledScrollableDummy height={scrollHeight} />
        </StyledScrollableOverlay>
      )}
    </>
  )
}

const padding = `${calculateMinSizeBasedOnFigma(34)} ${calculateMinSizeBasedOnFigma(30)}` // ts-styled-pluginエラーを避けるため
const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigma(871)};
  height: ${calculateMinSizeBasedOnFigma(704)};
  padding: ${padding};
  white-space: pre-line;
`
const StyledContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  min-height: 0;
`
const StyledBorder = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
`
const StyledLeftColumn = styled.div`
  width: ${calculateMinSizeBasedOnFigma(509)};
  height: 100%;
  overflow-x: visible;
  overflow-y: scroll;
  will-change: transform;
  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledRightColumn = styled.div`
  width: ${calculateMinSizeBasedOnFigma(270)};
  height: 100%;
  overflow-x: visible;
  overflow-y: scroll;
  will-change: transform;
  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledLeftColumnInnerContents = styled.div``
const StyledRightColumnInnerContents = styled.div`
  display: flex;
  flex-direction: column;
`
const fieldStyle = css`
  label {
    ${({ theme }) => css`
      color: ${theme.COLORS.TOBACCO_BROWN};
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    `}
  }
  input,
  textarea {
    border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
    border-radius: 4px;
    background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.84)};
    color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
    &::placeholder {
      font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
      color: ${({ theme }) => theme.COLORS.SILVER};
    }
  }
`
const StyledTaskEditTitleField = styled(TaskEditTitleField)`
  ${fieldStyle}
  width: ${calculateMinSizeBasedOnFigma(509)};
  margin-bottom: ${calculateMinSizeBasedOnFigma(27)};
`
const StyledTaskEditOverviewField = styled(TaskEditOverviewField)`
  ${fieldStyle}
  margin-bottom: ${calculateMinSizeBasedOnFigma(17)};
`
const StyledTaskCommentArea = styled(TaskCommentArea)`
  ${fieldStyle}
  margin-bottom: ${calculateMinSizeBasedOnFigma(30)};
`
const StyledCalenderField = styled(CalenderField)`
  margin-bottom: ${calculateMinSizeBasedOnFigma(19)};
`
const StyledSearchMemberField = StyledCalenderField.withComponent(SearchMemberField)
const StyledTaskEditStatusPointField = styled(TaskEditStatusPointField)`
  margin-bottom: ${calculateMinSizeBasedOnFigma(30)};
`
const StyledDeleteButtonWrapper = styled.div`
  position: relative;
`
const StyledDeleteButton = styled(CoarseButton)`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(32)};
  ${({ theme }) =>
    css`
      ${strokeTextShadow('1px', theme.COLORS.MONDO)};
      color: ${theme.COLORS.WHITE};
      > div {
        background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
        > div > div {
          background-color: ${convertIntoRGBA(theme.COLORS.RED_BERRY, 0.6)};
        }
      }
    `}
`
const StyledConfirmPopup = styled(ConfirmPopup)`
  width: ${calculateMinSizeBasedOnFigma(318)};
  height: ${calculateMinSizeBasedOnFigma(188)};
`
const StyledScrollableOverlay = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.UPPER_OVERLAY};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  will-change: transform;
  background-color: transparent;

  ${({ theme }) =>
    css`
      &::-webkit-scrollbar {
        width: 12px;
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px ${convertIntoRGBA(theme.COLORS.BLACK, 0.3)};
        border-radius: 10px;
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px ${convertIntoRGBA(theme.COLORS.BLACK, 0.3)};
        background-color: ${theme.COLORS.MINE_SHAFT};
      }
    `}
`
const StyledScrollableDummy = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: transparent;
`
