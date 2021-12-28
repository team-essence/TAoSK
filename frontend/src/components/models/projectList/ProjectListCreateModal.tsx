import React, { FCX } from 'react'
import styled, {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
  DefaultTheme,
} from 'styled-components'
import { Modal } from 'components/ui/modal/Modal'
import { TextAreaField } from 'components/ui/form/TextAreaField'
import { InputField } from 'components/ui/form/InputField'
import { CalenderField } from 'components/ui/form/CalenderField'
import Rating from '@mui/material/Rating'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { SearchMemberFieldFromProjectCreate } from 'components/ui/form/SearchMemberFieldFromProjectCreate'
import { ModalButton } from 'components/ui/button/ModalButton'
import { StarIcon } from 'components/ui/icon/StarIcon'
import { EmptyStarIcon } from 'components/ui/icon/EmptyStarIcon'
import { useProjectCreateForm } from 'hooks/useProjectCreateForm'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  shouldShow: boolean
  closeModal: () => void
}

export const ProjectListCreateModal: FCX<Props> = ({ shouldShow, closeModal, className }) => {
  const {
    register,
    isDisabled,
    errors,
    userData,
    setUserData,
    difficulty,
    handleDifficulty,
    handleCreateProject,
  } = useProjectCreateForm({ closeModal })

  return (
    <StyledModal
      title="プロジェクト作成"
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
              placeholder="プロジェクト概要を入力してください"
              registration={register('overview', {
                maxLength: { value: 255, message: '255文字以内で入力してください' },
              })}
              required={false}
              error={errors['overview']}
            />
          </StyledLeftColumn>

          <StyledBorder />

          <StyledRightColumn>
            <StyledCalenderField
              label="期限"
              registration={register('date', {
                required: '期限を選択してください',
              })}
              required={true}
            />

            <StyledDifficultyWrapper>
              <StyledDifficultyTitle>難易度</StyledDifficultyTitle>
              <StyledDifficultyRate
                defaultValue={1}
                value={difficulty}
                onChange={handleDifficulty}
                max={10}
                icon={<StyledStarIcon />}
                emptyIcon={<StyledEmptyStarIcon />}
              />
            </StyledDifficultyWrapper>

            <SearchMemberFieldFromProjectCreate
              setUserData={setUserData}
              userData={userData}
              shouldCache={true}
              isFixedFirstUser={true}
            />
          </StyledRightColumn>
        </StyledInputsWrapper>

        <StyledProjectCreateButton
          text="作成"
          onClick={handleCreateProject}
          disabled={isDisabled}
        />
      </StyledFormWrapper>
    </StyledModal>
  )
}

const padding = `${calculateMinSizeBasedOnFigma(46)} ${calculateMinSizeBasedOnFigma(26)}
${calculateMinSizeBasedOnFigma(17)}` // ts-styled-pluginエラーを避けるため

const StyledModal = styled(Modal)`
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigma(790)};
  height: ${calculateMinSizeBasedOnFigma(453)};
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
  height: ${calculateMinSizeBasedOnFigma(316)};
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
  margin-bottom: ${calculateMinSizeBasedOnFigma(17)};
`
const StyledDifficultyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${calculateMinSizeBasedOnFigma(16)};
  height: ${calculateMinSizeBasedOnFigma(51)};
`
const StyledDifficultyTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-size: ${theme.FONT_SIZES.SIZE_14};
    font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
  `}
`
const StyledDifficultyRate = styled(Rating)`
  width: ${calculateMinSizeBasedOnFigma(251)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledStarIcon = styled(StarIcon)`
  width: ${calculateMinSizeBasedOnFigma(22)};
  height: ${calculateMinSizeBasedOnFigma(22)};
`
const StyledEmptyStarIcon = StyledStarIcon.withComponent(EmptyStarIcon)
const StyledProjectCreateButton = styled(ModalButton)`
  margin: 0 auto;
`
