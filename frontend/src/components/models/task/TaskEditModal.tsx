import React, { FCX, Dispatch, SetStateAction } from 'react'
import styled, {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
  DefaultTheme,
} from 'styled-components'
import { theme } from 'styles/theme'
import { Modal } from 'components/ui/modal/Modal'
import { TextAreaField } from 'components/ui/form/TextAreaField'
import { InputField } from 'components/ui/form/InputField'
import { CalenderField } from 'components/ui/form/CalenderField'
import { SearchMemberField } from 'components/ui/form/SearchMemberField'
import { TaskStatusPointField } from 'components/models/task/TaskStatusPointField'
import { ModalButton } from 'components/ui/button/ModalButton'
import { TaskEditTitleField } from 'components/models/task/TaskEditTitleField'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useTaskCreateForm } from 'hooks/useTaskCreateForm'
import { STATUS_TYPE } from 'consts/status'
import { Task } from 'types/task'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
} & Omit<Task, 'vertical_sort'>

export const TaskEditModal: FCX<Props> = ({
  shouldShow,
  setShouldShow,
  className,
  ...taskInfo
}) => {
  return (
    <StyledModal
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      <StyledLeftColumn>
        <StyledTaskEditTitleField id={taskInfo.id} title={taskInfo.title} />
      </StyledLeftColumn>
      <StyledBorder />
      <StyledRightColumn>
        {/* <StyledCalenderField label="期限" registration={} required={false} />
            <StyledSearchMemberField setUserDatas={setUserDatas} userDatas={userDatas} />

            <StyledStatusWrapper className={className}>
              <StyledStatusTitle>獲得ステータスポイント</StyledStatusTitle>
              {Object.values(STATUS_TYPE).map((status, index) => (
                <TaskStatusPointField
                  status={status}
                  statusCounts={statusCounts}
                  setStatusCounts={setStatusCounts}
                  key={index}
                />
              ))}
            </StyledStatusWrapper> */}
      </StyledRightColumn>
    </StyledModal>
  )
}

const padding = `${calculateMinSizeBasedOnFigma(34)} ${calculateMinSizeBasedOnFigma(30)}
${calculateMinSizeBasedOnFigma(34)}` // ts-styled-pluginエラーを避けるため
const StyledModal = styled(Modal)`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigma(871)};
  height: ${calculateMinSizeBasedOnFigma(704)};
  padding: ${padding};
`
const StyledBorder = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
`
const StyledLeftColumn = styled.div`
  width: ${calculateMinSizeBasedOnFigma(509)};
`
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calculateMinSizeBasedOnFigma(270)};
  height: 100%;
`
const fieldStyle = css`
  input,
  textarea {
    border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
    border-radius: 4px;
    background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.84)};
    color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.SILVER};
    }
  }
`
const StyledTaskEditTitleField = styled(TaskEditTitleField)`
  ${fieldStyle}
`
const StyledCalenderField = styled(CalenderField)`
  margin-bottom: ${calculateMinSizeBasedOnFigma(19)};
`
const StyledSearchMemberField = StyledCalenderField.withComponent(SearchMemberField)
const StyledStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${calculateMinSizeBasedOnFigma(8)};
`
const StyledStatusTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-size: ${theme.FONT_SIZES.SIZE_16};
    font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
  `}
`
const StyledTaskCreateButton = styled(ModalButton)`
  margin: ${calculateMinSizeBasedOnFigma(31)} auto 0;
`
