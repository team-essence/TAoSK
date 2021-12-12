import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { useTaskOverviewEditForm } from 'hooks/useTaskOverviewEditForm'

type Props = {
  id: string
  overview: string
}

export const TaskEditOverviewField: FCX<Props> = ({ className, id, overview }) => {
  const { state, setState, newOverview, onClickSaveButton, disabled, register, error } =
    useTaskOverviewEditForm({ id, initialOverview: overview })

  if (state === 'view') {
    return (
      <StyledViewWrapper className={className} onClick={() => setState('edit')}>
        <StyledH3>概要</StyledH3>
        <StyledOverview>{newOverview}</StyledOverview>
        <StyledAnnotation>
          クリックで編集
          <FontAwesomeIcon icon={faPencilAlt} />
        </StyledAnnotation>
      </StyledViewWrapper>
    )
  } else {
    return (
      <StyledEditWrapper className={className}>
        <StyledH3>概要</StyledH3>
        <StyledTextarea
          {...register('overview', {
            maxLength: { value: 1024, message: '1024文字以内で入力してください' },
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
  flex-direction: column;
`
const StyledH3 = styled.h3`
  width: 100%;
  margin-bottom: ${calculateMinSizeBasedOnFigma(8)};
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.BOLD};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledOverview = styled.p`
  display: inline-block;
  width: 100%;
  margin-bottom: ${calculateMinSizeBasedOnFigma(5)};
  padding: ${calculateMinSizeBasedOnFigma(11)};
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  ${({ theme }) =>
    css`
      border: solid 1px ${convertIntoRGBA(theme.COLORS.WHITE, 0.6)};
      background-color: ${convertIntoRGBA(theme.COLORS.SILVER, 0.4)};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledAnnotation = styled.p`
  width: 100%;
  text-align: right;
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_10};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
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
const StyledTextarea = styled.textarea<{ hasError: boolean }>`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(180)};
  padding: ${calculateMinSizeBasedOnFigma(9.24)} ${calculateMinSizeBasedOnFigma(8)};
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
