import React, { FC, InputHTMLAttributes, useState, FocusEvent } from 'react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type StyledLabelProps = { color?: string; fontSize?: string }
type StyledInputProps = {
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  backgroundColor?: string
}
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  labelStyles?: StyledLabelProps
  inputStyles?: StyledInputProps
  label?: string
  error?: FieldError | undefined
  errorColor?: string
  description?: string
  registration: Partial<UseFormRegisterReturn>
  required?: boolean
  type?: 'text' | 'email' | 'password'
}

export const InputField: FC<InputFieldProps> = props => {
  const [hasBlured, setHasBlured] = useState<boolean>(false)
  const {
    labelStyles,
    inputStyles,
    errorColor = theme.colors.error,
    label,
    registration,
    error,
    required = true,
    ...inputAttributes
  } = props

  const shouldShowError = hasBlured && error?.message
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (inputAttributes.onBlur) inputAttributes.onBlur(e)
    setHasBlured(true)
  }

  return (
    <div>
      <StyledLabel {...labelStyles} color={shouldShowError ? errorColor : undefined}>
        {label}
        <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
        <StyledInputWrapper {...inputStyles}>
          <input {...registration} {...inputAttributes} onBlur={onBlur} />
        </StyledInputWrapper>
      </StyledLabel>
      {shouldShowError && (
        <StyledErrorMessage color={errorColor} role="alert" aria-label={error.message}>
          {error.message}
        </StyledErrorMessage>
      )}
    </div>
  )
}

const StyledLabel = styled.label<StyledLabelProps>`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
`
StyledLabel.defaultProps = {
  color: theme.colors.chocolate,
  fontSize: theme.fontSizes.size_16,
}
const StyledInputWrapper = styled.div<StyledInputProps>`
  input {
    height: ${props => props.height};
    border: ${props => props.border};
    border-radius: ${props => props.borderRadius};
    background-color: ${props => props.backgroundColor};
  }
`
StyledInputWrapper.defaultProps = {
  height: '40px',
  border: `solid 1px ${theme.colors.chocolate}`,
  borderRadius: '2px',
  backgroundColor: convertIntoRGBA(theme.colors.white, 0.7),
}
const StyledErrorMessage = styled.div<{ color: string }>`
  color: ${props => props.color};
  font-size: ${({ theme }) => theme.fontSizes.size_14};
`
const StyledRequiredSpan = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.error};
`
