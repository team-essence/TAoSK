import React, { FC, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import styled from 'styled-components'
import { theme } from 'styles/theme'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: FieldError | undefined
  description?: string
  registration: Partial<UseFormRegisterReturn>
  type?: 'text' | 'email' | 'password'
}

export const InputField: FC<InputFieldProps> = props => {
  const { label, registration, error, ...inputAttributes } = props
  return (
    <div>
      <label>
        {label}
        <div>
          <input {...inputAttributes} {...registration} />
        </div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message}>
          {error.message}
        </div>
      )}
    </div>
  )
}

type StyledLabelProps = { color?: string }

const StyledLabel = styled.label<StyledLabelProps>`
  color: ${props => props.color};
  font-size: ${theme.fontSizes.size_16};
`
StyledLabel.defaultProps = {
  color: theme.colors.chocolate,
}
