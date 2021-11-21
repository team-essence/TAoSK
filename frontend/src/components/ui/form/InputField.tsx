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
export type InputFieldProps = {
  className?: string
  labelStyles?: StyledLabelProps
  inputStyles?: StyledInputProps
  label?: string
  error?: FieldError | undefined
  errorColor?: string
  description?: string
  registration: Partial<UseFormRegisterReturn>
  required?: boolean
  type?: 'text' | 'email' | 'password'
} & InputHTMLAttributes<HTMLInputElement>

export const InputField: FC<InputFieldProps> = props => {
  const [hasBlured, setHasBlured] = useState<boolean>(false)
  const {
    className,
    labelStyles,
    inputStyles,
    errorColor = theme.COLORS.ERROR,
    label,
    registration,
    error,
    required = true,
    color,
    ...inputAttributes
  } = props

  const shouldShowError = hasBlured && error?.message
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputAttributes.onBlur && inputAttributes.onBlur(e)
    setHasBlured(true)
  }

  return (
    <div className={className}>
      <StyledLabelWrapper marginBottom={shouldShowError ? '0px' : '24px'}>
        <StyledLabel {...labelStyles} color={shouldShowError ? errorColor : color}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledInputWrapper {...inputStyles}>
            <input {...registration} {...inputAttributes} onBlur={onBlur} />
          </StyledInputWrapper>
        </StyledLabel>
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
const StyledLabel = styled.label<StyledLabelProps>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 700;
`
StyledLabel.defaultProps = {
  color: theme.COLORS.CHOCOLATE,
  fontSize: theme.FONT_SIZES.SIZE_16,
}
const StyledInputWrapper = styled.div<StyledInputProps>`
  input {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-left: 8px;
    border: ${({ border }) => border};
    border-radius: ${({ borderRadius }) => borderRadius};
    background-color: ${({ backgroundColor }) => backgroundColor};
  }
`
StyledInputWrapper.defaultProps = {
  width: '100%',
  height: '40px',
  border: `solid 1px ${theme.COLORS.CHOCOLATE}`,
  borderRadius: '2px',
  backgroundColor: convertIntoRGBA(theme.COLORS.WHITE, 0.7),
}
const StyledErrorMessage = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`
const StyledRequiredSpan = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.COLORS.ERROR};
`
