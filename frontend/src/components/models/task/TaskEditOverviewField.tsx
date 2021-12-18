import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { FlexTextarea } from 'components/ui/textarea/FlexTextarea'
import { CancelButton } from 'components/ui/button/CancelButton'
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
      <StyledViewWrapper className={className}>
        <StyledH3>概要</StyledH3>
        <StyledClickableArea onClick={() => setState('edit')}>
          <StyledOverview>{newOverview || '詳しい説明を追加してください'}</StyledOverview>
          <StyledAnnotation>
            クリックで編集
            <FontAwesomeIcon icon={faPencilAlt} />
          </StyledAnnotation>
        </StyledClickableArea>
      </StyledViewWrapper>
    )
  } else {
    return (
      <StyledEditWrapper className={className}>
        <StyledH3>概要</StyledH3>
        <StyledFlexTextarea
          initialVal={newOverview}
          {...register('overview', {
            maxLength: { value: 1024, message: '1024文字以内で入力してください' },
          })}
          hasError={!!error?.message}
        />
        <StyledBottomRow>
          <StyledErrorMessage>{!!error?.message && error.message}</StyledErrorMessage>
          <StyledButtonWrapper>
            <CancelButton onClick={() => setState('view')} />
            <CoarseRedOxideButton text="追加" onClick={onClickSaveButton} disabled={disabled} />
          </StyledButtonWrapper>
        </StyledBottomRow>
      </StyledEditWrapper>
    )
  }
}

const StyledViewWrapper = styled.div`
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
const StyledClickableArea = styled.div`
  cursor: pointer;
`
const StyledOverview = styled.p`
  display: inline-block;
  width: 100%;
  margin-bottom: ${calculateMinSizeBasedOnFigma(5)};
  padding: ${calculateMinSizeBasedOnFigma(7)} ${calculateMinSizeBasedOnFigma(11)};
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
const StyledFlexTextarea = styled(FlexTextarea)<{ hasError: boolean }>`
  width: 100%;

  ${({ theme, hasError }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_14};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      color: ${theme.COLORS.TOBACCO_BROWN};

      > div {
        padding: ${calculateMinSizeBasedOnFigma(9.24)} ${calculateMinSizeBasedOnFigma(8)};
        min-height: ${calculateMinSizeBasedOnFigma(180)};
      }
      textarea {
        padding: ${calculateMinSizeBasedOnFigma(9.24)} ${calculateMinSizeBasedOnFigma(8)};
        ${hasError &&
        css`
          border-color: ${theme.COLORS.ERROR} !important;
        `}
      }
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
