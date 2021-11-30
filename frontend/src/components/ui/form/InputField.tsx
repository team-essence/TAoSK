import React, { FC, InputHTMLAttributes, useState, FocusEvent, ReactNode } from 'react'
import type { StyledLabelProps, FieldProps } from 'types/fieldProps'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateMinSizeBasedOnFigma'

type StyledBoxProps = {
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  backgroundColor?: string
  children?: ReactNode
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
    children,
    ...inputAttributes
  } = props

  const shouldShowError = hasBlured && error?.message
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputAttributes.onBlur && inputAttributes.onBlur(e)
    setHasBlured(true)
  }

  return (
    <div className={className}>
      <StyledLabelWrapper
        marginBottom={shouldShowError ? '0px' : calculateMinSizeBasedOnFigmaWidth(24)}>
        <StyledLabel {...labelStyles} color={shouldShowError ? errorColor : color}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledInputWrapper
            {...inputStyles}
            border={shouldShowError ? `solid 1px ${errorColor}` : undefined}>
            <input {...registration} {...inputAttributes} onBlur={onBlur} />
            {children}
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
  ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
StyledLabel.defaultProps = {
  color: theme.COLORS.CHOCOLATE,
  fontSize: theme.FONT_SIZES.SIZE_16,
}
const StyledInputWrapper = styled.div<StyledBoxProps>`
  position: relative;
  margin-top: ${calculateMinSizeBasedOnFigmaWidth(4)};
  input {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-left: ${calculateMinSizeBasedOnFigmaWidth(8)};
    border: ${({ border }) => border};
    border-radius: ${({ borderRadius }) => borderRadius};
    background-color: ${({ backgroundColor }) => backgroundColor};
    &::placeholder {
      font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
      color: ${({ theme }) => theme.COLORS.GRAY};
    }
  }
`
StyledInputWrapper.defaultProps = {
  width: '100%',
  height: calculateMinSizeBasedOnFigmaWidth(40),
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
