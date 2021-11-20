import React, { FC, SelectHTMLAttributes, useState, FocusEvent } from 'react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type StyledLabelProps = { color?: string; fontSize?: string }
type StyledSelectProps = {
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  backgroundColor?: string
}
type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string
  labelStyles?: StyledLabelProps
  selectStyles?: StyledSelectProps
  options: Record<'value' | 'item', string>[]
  label?: string
  error?: FieldError | undefined
  errorColor?: string
  description?: string
  registration: Partial<UseFormRegisterReturn>
  required?: boolean
  type?: 'text' | 'email' | 'password'
}

export const SelectField: FC<SelectFieldProps> = props => {
  const [hasBlured, setHasBlured] = useState<boolean>(false)
  const {
    className,
    labelStyles,
    selectStyles,
    options,
    errorColor = theme.colors.error,
    label,
    registration,
    error,
    required = true,
    ...selectAttributes
  } = props

  const shouldShowError = hasBlured && error?.message
  const onBlur = (e: FocusEvent<HTMLSelectElement>) => {
    if (selectAttributes.onBlur) selectAttributes.onBlur(e)
    setHasBlured(true)
  }

  return (
    <div className={className}>
      <StyledLabelWrapper marginBottom={shouldShowError ? '' : '24px'}>
        <StyledLabel {...labelStyles} color={shouldShowError ? errorColor : undefined}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledSelectWrapper {...selectStyles}>
            <select {...registration} {...selectAttributes} onBlur={onBlur}>
              {options.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.item}
                </option>
              ))}
            </select>
          </StyledSelectWrapper>
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

const StyledLabelWrapper = styled.label<{ marginBottom: string }>`
  margin-bottom: ${props => props.marginBottom};
`
const StyledLabel = styled.label<StyledLabelProps>`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: 700;
`
StyledLabel.defaultProps = {
  color: theme.colors.chocolate,
  fontSize: theme.fontSizes.size_16,
}
const StyledSelectWrapper = styled.div<StyledSelectProps>`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: calc(${props => props.height} / 2 - 4px);
    right: 14px;
    border-top: 8px solid ${({ theme }) => theme.colors.chocolate};
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }

  select {
    -webkit-appearance: none;
    appearance: none;
    width: ${props => props.width};
    height: ${props => props.height};
    padding-left: 8px;
    border: ${props => props.border};
    border-radius: ${props => props.borderRadius};
    background-color: ${props => props.backgroundColor};
  }
`
StyledSelectWrapper.defaultProps = {
  width: 'min(33.33vw, 480px)',
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
