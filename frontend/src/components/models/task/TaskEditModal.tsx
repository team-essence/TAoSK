import React, { FCX, Dispatch, SetStateAction } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { Modal } from 'components/ui/modal/Modal'
import { CalenderField } from 'components/ui/form/CalenderField'
import { SearchMemberField } from 'components/ui/form/SearchMemberField'
import { TaskEditTitleField } from 'components/models/task/TaskEditTitleField'
import { TaskEditOverviewField } from 'components/models/task/TaskEditOverviewField'
import { TaskEditStatusPointField } from 'components/models/task/TaskEditStatusPointField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useTaskEndDateEditForm } from 'hooks/useTaskEndDateEditForm'
import { useTaskUserSelectForm } from 'hooks/useTaskUserSelectForm'
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
  const { userDatas, setUserDatas } = useTaskUserSelectForm({ id, initialUserDatas: allocations })

  return (
    <StyledModal
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      <StyledLeftColumn>
        <StyledTaskEditTitleField id={id} title={title} />
        <StyledTaskEditOverviewField id={id} overview={overview} />
      </StyledLeftColumn>
      <StyledBorder />
      <StyledRightColumn>
        <StyledCalenderField
          label="期限"
          registration={register('date')}
          required={false}
          onChange={onChange}
        />
        <StyledSearchMemberField setUserDatas={setUserDatas} userDatas={userDatas} />
        <StyledTaskEditStatusPointField
          id={id}
          technology={technology}
          solution={solution}
          achievement={achievement}
          motivation={motivation}
          design={design}
          plan={plan}
        />
        <StyledDeleteButton text="タスクを削除" disabled={false} />
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
  white-space: pre-line;
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
  margin-bottom: ${calculateMinSizeBasedOnFigma(27)};
`
const StyledTaskEditOverviewField = styled(TaskEditOverviewField)`
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
type Disabled = { disabled: boolean }
const StyledDeleteButton = styled(CoarseButton).attrs<Disabled>(({ disabled }) => ({
  disabled,
}))<Disabled>`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(32)};
  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        color: ${theme.COLORS.SILVER};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.ALTO, 0.55)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.NOBEL, 0.64)};
          }
        }
      `
    } else {
      return css`
        ${strokeTextShadow('1px', theme.COLORS.MONDO)};
        color: ${theme.COLORS.WHITE};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.RED_BERRY, 0.6)};
          }
        }
      `
    }
  }}
`
