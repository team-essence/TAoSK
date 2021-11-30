import React, { FC, SelectHTMLAttributes, useState, FocusEvent, ChangeEvent } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

type Props = {
  className?: string
  label?: string
  error?: FieldError | undefined
  registration: Partial<UseFormRegisterReturn>
  errorColor?: string
  required?: boolean
  type?: 'text' | 'email' | 'password'
  options: Record<'value' | 'item', string>[]
} & SelectHTMLAttributes<HTMLSelectElement>

export const SelectField: FC<Props> = ({
  className,
  options,
  errorColor = theme.COLORS.ERROR,
  label,
  registration,
  error,
  required = true,
  ...selectAttributes
}) => {
  const [value, setValue] = useState<string>('')
  const [hasBlured, setHasBlured] = useState<boolean>(false)

  const shouldShowError = !!(hasBlured && error?.message)
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    registration?.onChange && registration.onChange(e)
    setValue(e.target.value)
  }
  const onBlur = (e: FocusEvent<HTMLSelectElement>) => {
    registration?.onBlur && registration.onBlur(e)
    selectAttributes.onBlur && selectAttributes.onBlur(e)
    setHasBlured(true)
  }

  return (
    <div className={className}>
      <StyledLabelWrapper
        marginBottom={shouldShowError ? '0px' : calculateMinSizeBasedOnFigmaWidth(24)}>
        <StyledLabel color={shouldShowError ? errorColor : undefined}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledSelectWrapper>
            <StyledSelect
              {...registration}
              {...selectAttributes}
              isEmptyValue={!value}
              shouldShowError={shouldShowError}
              errorColor={errorColor}
              onChange={onChange}
              onBlur={onBlur}>
              {options.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.item}
                </option>
              ))}
            </StyledSelect>
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

type StyledSelectProps = {
  shouldShowError: boolean
  errorColor: string
  isEmptyValue: boolean
}

const StyledLabelWrapper = styled.div<{ marginBottom: string }>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
`
const StyledLabel = styled.label`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
const StyledSelectWrapper = styled.div`
  position: relative;
  margin-top: ${calculateMinSizeBasedOnFigmaWidth(4)};

  &:after {
    content: '';
    position: absolute;
    top: calc(${calculateMinSizeBasedOnFigmaWidth(20)} - ${calculateMinSizeBasedOnFigmaWidth(2)});
    right: ${calculateMinSizeBasedOnFigmaWidth(14)};
    border-top: ${calculateMinSizeBasedOnFigmaWidth(7)} solid
      ${({ theme }) => theme.COLORS.CHOCOLATE};
    border-right: ${calculateMinSizeBasedOnFigmaWidth(6)} solid transparent;
    border-left: ${calculateMinSizeBasedOnFigmaWidth(6)} solid transparent;
  }
`
const StyledSelect = styled.select<StyledSelectProps>`
  -webkit-appearance: none;
  appearance: none;
  width: ${calculateMinSizeBasedOnFigmaWidth(480)};
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: solid 1px
    ${({ theme, shouldShowError, errorColor }) =>
      shouldShowError ? errorColor : theme.COLORS.CHOCOLATE};
  border-radius: 2px;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.WHITE, 0.7)};
  color: ${({ isEmptyValue }) => (isEmptyValue ? theme.COLORS.GRAY : theme.COLORS.BLACK)};
  &::placeholder {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
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
