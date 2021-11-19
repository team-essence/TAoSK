import React, { FC, InputHTMLAttributes } from 'react'
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
  description?: string
  registration: Partial<UseFormRegisterReturn>
  type?: 'text' | 'email' | 'password'
}

export const InputField: FC<InputFieldProps> = props => {
  const { labelStyles, inputStyles, label, registration, error, ...inputAttributes } = props

  return (
    <div>
      <StyledLabel {...labelStyles}>
        {label}
        <StyledInputWrapper {...inputStyles}>
          <input {...registration} {...inputAttributes} />
        </StyledInputWrapper>
      </StyledLabel>
      {error?.message && (
        <div role="alert" aria-label={error.message}>
          {error.message}
        </div>
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
