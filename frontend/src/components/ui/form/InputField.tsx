import React, { FC, InputHTMLAttributes, useState, FocusEvent } from 'react'
import type { StyledLabelProps, FieldProps } from 'types/fieldProps'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { generateStyleBasedOnFigma } from 'utils/calculateVwBasedOnFigma'

type StyledBoxProps = {
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  backgroundColor?: string
}
type Props = FieldProps<InputHTMLAttributes<HTMLInputElement>, 'input', StyledBoxProps>

export const InputField: FC<Props> = props => {
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
          <StyledInputWrapper
            {...inputStyles}
            border={shouldShowError ? `solid 1px ${errorColor}` : undefined}>
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
  ${({ marginBottom }) => generateStyleBasedOnFigma`
      margin-bottom: ${marginBottom};
  `}
`
const StyledLabel = styled.label<StyledLabelProps>`
  color: ${({ color }) => color};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  ${({ fontSize }) => generateStyleBasedOnFigma`
    font-size: ${fontSize};
  `}
`
StyledLabel.defaultProps = {
  color: theme.COLORS.CHOCOLATE,
  fontSize: theme.FONT_SIZES.SIZE_16,
}
const StyledInputWrapper = styled.div<StyledBoxProps>`
  ${generateStyleBasedOnFigma`
    margin-top: 4px;
  `}
  input {
    border: ${({ border }) => border};
    border-radius: ${({ borderRadius }) => borderRadius};
    background-color: ${({ backgroundColor }) => backgroundColor};
    ${({ width, height }) => generateStyleBasedOnFigma`
      width: ${width};
      height: ${height};
      padding-left: 8px;
    `}
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY};
      ${({ theme }) => generateStyleBasedOnFigma`
        font-size: ${theme.FONT_SIZES.SIZE_14};
      `}
    }
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
  ${({ theme }) => generateStyleBasedOnFigma`
    font-size: ${theme.FONT_SIZES.SIZE_14};
  `}
`
const StyledRequiredSpan = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.COLORS.ERROR};
`
