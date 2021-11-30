import React, { FC, InputHTMLAttributes, useState, FocusEvent, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

type Props = {
  className?: string
  label?: string
  error?: FieldError | undefined
  children?: ReactNode
  registration: Partial<UseFormRegisterReturn>
  errorColor?: string
  required?: boolean
  type?: 'text' | 'email' | 'password'
} & InputHTMLAttributes<HTMLInputElement>

export const InputField: FC<Props> = props => {
  const [hasBlured, setHasBlured] = useState<boolean>(false)
  const {
    className,
    errorColor = theme.COLORS.ERROR,
    label,
    registration,
    error,
    required = true,
    children,
    ...inputAttributes
  } = props

  const shouldShowError = !!(hasBlured && error?.message)
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputAttributes.onBlur && inputAttributes.onBlur(e)
    setHasBlured(true)
  }

  return (
    <div className={className}>
      <StyledLabelWrapper
        marginBottom={shouldShowError ? '0px' : calculateMinSizeBasedOnFigmaWidth(24)}>
        <label color={shouldShowError ? errorColor : undefined}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledInputWrapper shouldShowError={shouldShowError} errorColor={errorColor}>
            <input {...registration} {...inputAttributes} onBlur={onBlur} />
            {children}
          </StyledInputWrapper>
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

const StyledLabelWrapper = styled.div<{ marginBottom: string }>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
`
const StyledInputWrapper = styled.div<{ shouldShowError: boolean; errorColor: string }>`
  position: relative;
  margin-top: ${calculateMinSizeBasedOnFigmaWidth(4)};
  input {
    padding-left: ${calculateMinSizeBasedOnFigmaWidth(8)};
    border-color: ${props => (props.shouldShowError ? props.errorColor : undefined)};
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
