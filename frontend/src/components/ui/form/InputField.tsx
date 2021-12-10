import React, { FC, useEffect, InputHTMLAttributes, useState, FocusEvent, ReactNode } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
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

export const InputField: FC<Props> = ({
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
      <StyledLabelWrapper marginBottom={shouldShowError ? '0px' : calculateMinSizeBasedOnFigma(24)}>
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
  margin-top: ${calculateMinSizeBasedOnFigma(4)};
  input {
    padding-left: ${calculateMinSizeBasedOnFigma(8)};
    border-color: ${props => (props.shouldShowError ? props.errorColor : undefined)} !important;
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
