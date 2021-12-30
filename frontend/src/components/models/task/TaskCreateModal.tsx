import React, { FCX } from 'react'
import styled, {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
  DefaultTheme,
} from 'styled-components'
import { Groups } from 'types/groups'
import { Modal } from 'components/ui/modal/Modal'
import { TextAreaField } from 'components/ui/form/TextAreaField'
import { InputField } from 'components/ui/form/InputField'
import { CalenderField } from 'components/ui/form/CalenderField'
import { SearchMemberField } from 'components/ui/form/SearchMemberField'
import { TaskStatusPointField } from 'components/models/task/TaskStatusPointField'
import { ModalButton } from 'components/ui/button/ModalButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useTaskCreateForm } from 'hooks/useTaskCreateForm'
import { STATUS_TYPE } from 'consts/status'

type Props = {
  shouldShow: boolean
  closeModal: () => void
  verticalSort: number
  list_id: string
} & Groups

export const TaskCreateModal: FCX<Props> = ({
  shouldShow,
  closeModal,
  className,
  verticalSort,
  list_id,
  groups,
}) => {
  const {
    handleAddTask,
    isDisabled,
    register,
    errors,
    statusCounts,
    setStatusCounts,
    userData,
    setUserData,
  } = useTaskCreateForm({
    verticalSort,
    list_id,
    closeModal,
  })

  return (
    <StyledModal
      title="タスク作成"
      shouldShow={shouldShow}
      onClickCloseBtn={closeModal}
      className={className}>
      <StyledFormWrapper>
        <StyledInputsWrapper>
          <StyledLeftColumn>
            <StyledInputField
              label="タイトル"
              placeholder="タイトルを入力してください"
              registration={register('title', {
                required: 'タイトルは必須です',
                maxLength: { value: 255, message: '255文字以内で入力してください' },
              })}
              error={errors['title']}
            />
            <StyledOverviewField
              label="概要"
              placeholder="タスク概要を入力してください"
              registration={register('overview', {
                maxLength: { value: 1024, message: '1024文字以内で入力してください' },
              })}
              required={false}
            />
          </StyledLeftColumn>
          <StyledBorder />
          <StyledRightColumn>
            <StyledCalenderField label="期限" registration={register('date')} required={false} />
            <StyledSearchMemberField
              setUserData={setUserData}
              userData={userData}
              shouldCache={true}
              groups={groups}
            />

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
            </StyledStatusWrapper>
          </StyledRightColumn>
        </StyledInputsWrapper>
        <StyledTaskCreateButton text="作成" onClick={handleAddTask} disabled={isDisabled} />
      </StyledFormWrapper>
    </StyledModal>
  )
}

const padding = `${calculateMinSizeBasedOnFigma(46)} ${calculateMinSizeBasedOnFigma(26)}
${calculateMinSizeBasedOnFigma(24)}` // ts-styled-pluginエラーを避けるため

const StyledModal = styled(Modal)`
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigma(790)};
  height: ${calculateMinSizeBasedOnFigma(709)};
  padding: ${padding};
`
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
const StyledInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(541)};
`
const StyledBorder = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
`
const StyledLeftColumn = styled.div`
  width: ${calculateMinSizeBasedOnFigma(434)};
`
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calculateMinSizeBasedOnFigma(270)};
  height: 100%;
`
const fieldStyle = (
  inputCss: FlattenSimpleInterpolation,
): FlattenInterpolation<ThemeProps<DefaultTheme>> => css`
  label {
    ${({ theme }) => css`
      color: ${theme.COLORS.TOBACCO_BROWN};
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    `}
  }
  input,
  textarea {
    ${inputCss}
    border-radius: 4px;
    ${({ theme }) =>
      css`
        border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
        background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.84)};
        color: ${theme.COLORS.TOBACCO_BROWN};
        &::placeholder {
          font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
          color: ${theme.COLORS.SILVER};
        }
      `}
  }
`
const StyledInputField = styled(InputField)`
  ${fieldStyle(css`
    width: 100%;
    height: ${calculateMinSizeBasedOnFigma(40)};
  `)}
`
const StyledOverviewField = styled(TextAreaField)`
  ${fieldStyle(css`
    width: 100%;
    height: ${calculateMinSizeBasedOnFigma(180)};
  `)}
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
