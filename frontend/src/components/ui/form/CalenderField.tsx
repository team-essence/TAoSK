import React, { FCX, useEffect, InputHTMLAttributes, useState, FocusEvent, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type Props = {
  label?: string
  error?: FieldError | undefined
  children?: ReactNode
  registration: Partial<UseFormRegisterReturn>
  errorColor?: string
  required?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const CalenderField: FCX<Props> = ({
  className,
  errorColor = theme.COLORS.ERROR,
  label,
  registration,
  error,
  required = true,
  children,
  ...inputAttributes
}) => {
  const [hasBlured, setHasBlured] = useState<boolean>(false)
  const shouldShowError = !!(hasBlured && error?.message)
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputAttributes.onBlur && inputAttributes.onBlur(e)
    setHasBlured(true)
  }

  useEffect(() => {
    return () => setHasBlured(false)
  }, [])

  return (
    <div className={className}>
      <StyledLabelWrapper>
        <label color={shouldShowError ? errorColor : undefined}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledInputWrapper shouldShowError={shouldShowError} errorColor={errorColor}>
            <StyledCalenderIconWrapper>
              <StyledCalenderIcon src="/images/calender-icon.png" alt="カレンダーのアイコン" />
            </StyledCalenderIconWrapper>
            <StyledInput {...registration} {...inputAttributes} onBlur={onBlur} type="date" />
          </StyledInputWrapper>
          {children}
        </label>
      </StyledLabelWrapper>
      {shouldShowError && (
        <StyledErrorMessage color={errorColor} role="alert" aria-label={error.message}>
          {error.message}
        </StyledErrorMessage>
      )}
    </div>
  )
}

const StyledLabelWrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
  `}
`
const StyledInputWrapper = styled.div<{ shouldShowError: boolean; errorColor: string }>`
  position: relative;
  display: flex;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(40)};
  margin-top: ${calculateMinSizeBasedOnFigma(4)};
  border: solid 1px
    ${({ theme, shouldShowError, errorColor }) =>
      shouldShowError ? errorColor : convertIntoRGBA(theme.COLORS.WHITE, 0.6)};
  border-radius: 4px;
`
const StyledCalenderIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigma(35)};
  height: 100%;
  border-radius: 4px 0px 0px 4px;
  background-color: ${({ theme }) => theme.COLORS.GALLERY};
`
const StyledCalenderIcon = styled.img`
  object-fit: contain;
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigma(27)};
`
const StyledInput = styled.input`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  width: 100%;
  height: 100%;
  padding-left: ${calculateMinSizeBasedOnFigma(8)};
  border: none;
  border-radius: 0px 4px 4px 0px;

  ${({ theme }) => css`
    background-color: ${convertIntoRGBA(theme.COLORS.SILVER, 0.4)};
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
  `}
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    position: absolute;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: none;
  }
`
const StyledErrorMessage = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`
const StyledRequiredSpan = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.COLORS.ERROR};
`
