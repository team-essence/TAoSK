import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { CancelButton } from 'components/ui/button/CancelButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useTaskTitleEditForm } from 'hooks/useTaskTitleEditForm'

type Props = {
  id: string
  title: string
}

export const TaskEditTitleField: FCX<Props> = ({ className, id, title }) => {
  const { state, setState, onClickSaveButton, disabled, register, error } = useTaskTitleEditForm({
    id,
    initialTitle: title,
  })

  if (state === 'view') {
    return (
      <StyledViewWrapper className={className} onClick={() => setState('edit')}>
        <StyledH2>{title}</StyledH2>
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
            <CancelButton onClick={() => setState('view')} />
            <CoarseRedOxideButton text="追加" onClick={onClickSaveButton} disabled={disabled} />
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
  padding-left: ${calculateMinSizeBasedOnFigma(8)};
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
