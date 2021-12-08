import React, { FC, useState, Dispatch, SetStateAction } from 'react'
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
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateMinSizeBasedOnFigmaHeight,
} from 'utils/calculateSizeBasedOnFigma'
import { useTaskCreateForm } from 'hooks/useTaskCreateForm'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
  className?: string
}

export const UserAccountSettingModal: FC<Props> = ({ shouldShow, setShouldShow, className }) => {
  return (
    <StyledModal
      title="アカウント設定"
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      ああああ
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: ${calculateMinSizeBasedOnFigmaWidth(790)};
  height: ${calculateMinSizeBasedOnFigmaHeight(709)};
  padding: ${calculateMinSizeBasedOnFigmaHeight(46)} ${calculateMinSizeBasedOnFigmaWidth(26)};
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
  width: 100%;
  height: 100%;
`
const StyledBorder = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
`
const StyledLeftColumn = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(434)};
`
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calculateMinSizeBasedOnFigmaWidth(270)};
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
    border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
    border-radius: 4px;
    background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.84)};
    color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.SILVER};
    }
  }
`
const StyledInputField = styled(InputField)`
  ${fieldStyle(css`
    width: 100%;
    height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  `)}
`
const StyledOverviewField = styled(TextAreaField)`
  ${fieldStyle(css`
    width: 100%;
    height: ${calculateMinSizeBasedOnFigmaWidth(180)};
  `)}
`
const StyledStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
`
const StyledStatusTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-size: ${theme.FONT_SIZES.SIZE_16};
    font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
  `}
`
const StyledTaskCreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: ${calculateMinSizeBasedOnFigmaWidth(160)};
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  background-image: url('/svg/gold-button.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  ${({ theme }) => css`
    filter: drop-shadow(
        0 ${calculateMinSizeBasedOnFigmaWidth(4)} ${calculateMinSizeBasedOnFigmaWidth(4)}
          ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)}
      )
      drop-shadow(
        0 ${calculateMinSizeBasedOnFigmaWidth(1.5)} ${calculateMinSizeBasedOnFigmaWidth(1)}
          ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)}
      );
  `}
`
const StyledTaskCreateText = styled.p`
  height: ${calculateMinSizeBasedOnFigmaWidth(30)};
  text-align: center;
  ${({ theme }) => css`
    ${strokeTextShadow('1.2px', theme.COLORS.MONDO)}
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZES.SIZE_20};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
  `}
`
