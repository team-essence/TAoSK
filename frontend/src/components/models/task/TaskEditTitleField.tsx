import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { useTaskTitleEditForm } from 'hooks/useTaskTitleEditForm'

type Props = {
  className?: string
  id: string
  title: string
}

export const TaskEditTitleField: FC<Props> = ({ className, title }) => {
  const { state, setState, newTitle, onClickSaveButton, disabled, register, error } =
    useTaskTitleEditForm({ initialTitle: title })

  if (state === 'view') {
    return (
      <StyledViewWrapper className={className} onClick={() => setState('edit')}>
        <StyledH2>{newTitle}</StyledH2>
        <StyledFontAwesomeIcon icon={faPencilAlt} />
      </StyledViewWrapper>
    )
  } else {
    return (
      <StyledEditWrapper className={className}>
        <StyledInput
          type="text"
          {...register('title', {
            required: 'タイトルは必須です',
            maxLength: { value: 255, message: '255文字以内で入力してください' },
          })}
          hasError={!!error?.message}
        />
        <StyledBottomRow>
          <StyledErrorMessage>{!!error?.message && error.message}</StyledErrorMessage>
          <StyledButtonWrapper>
            <StyledCancelButton onClick={() => setState('view')}>
              <StyledCancelText>キャンセル</StyledCancelText>
            </StyledCancelButton>
            <StyledCoarseButton text="追加" onClick={onClickSaveButton} disabled={disabled} />
          </StyledButtonWrapper>
        </StyledBottomRow>
      </StyledEditWrapper>
    )
  }
}

const StyledViewWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const StyledH2 = styled.h2`
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_20};
      font-weight: ${theme.FONT_WEIGHTS.BOLD};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_14};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(8)};
  width: 100%;
`
const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(40)};
  ${({ hasError, theme }) =>
    hasError &&
    css`
      border-color: ${theme.COLORS.ERROR} !important;
    `}
`
const StyledBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const StyledErrorMessage = styled.p`
  width: 100%;
  ${({ theme }) =>
    css`
      color: ${theme.COLORS.ERROR};
      font-size: ${theme.FONT_SIZES.SIZE_14};
    `}
`
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(12)};
  width: 100%;
`
const StyledCancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledCancelText = styled.p`
  position: relative;
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_12};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}

  &:after {
    content: '';
    position: absolute;
    bottom: ${calculateMinSizeBasedOnFigma(1.5)};
    left: 0;
    ${({ theme }) =>
      css`
        width: 100%;
        height: 0.5px;
        background-color: ${theme.COLORS.TOBACCO_BROWN};
      `}
  }
`
type Disabled = { disabled: boolean }
const StyledCoarseButton = styled(CoarseButton).attrs<Disabled>(({ disabled }) => ({
  disabled,
}))<Disabled>`
  width: ${calculateMinSizeBasedOnFigma(64)};
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
        color: ${theme.COLORS.BRANDY};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)};
          }
        }
      `
    }
  }}
`
