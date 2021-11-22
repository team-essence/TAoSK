import React, { FC, SelectHTMLAttributes, useState, FocusEvent, ChangeEvent } from 'react'
import type { StyledLabelProps, FieldProps } from 'types/fieldProps'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type StyledSelectProps = {
  width?: string
  height?: string
  border?: string
  color?: string
  borderRadius?: string
  backgroundColor?: string
}
type Props = FieldProps<SelectHTMLAttributes<HTMLSelectElement>, 'select', StyledSelectProps> & {
  options: Record<'value' | 'item', string>[]
}

export const SelectField: FC<Props> = props => {
  const [value, setValue] = useState<string>('')
  const [hasBlured, setHasBlured] = useState<boolean>(false)
  const {
    className,
    marginBottom,
    labelStyles,
    selectStyles,
    options,
    errorColor = theme.COLORS.ERROR,
    label,
    registration,
    error,
    required = true,
    ...selectAttributes
  } = props

  const shouldShowError = hasBlured && error?.message
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
      <StyledLabelWrapper marginBottom={shouldShowError ? '0px' : marginBottom}>
        <StyledLabel {...labelStyles} color={shouldShowError ? errorColor : undefined}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledSelectWrapper height={selectStyles?.height}>
            <StyledSelect
              {...selectStyles}
              {...registration}
              {...selectAttributes}
              color={!value ? theme.COLORS.GRAY : undefined}
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
const StyledSelectWrapper = styled.div<{ height?: string }>`
  position: relative;
  margin-top: 4px;

  &:after {
    content: '';
    position: absolute;
    top: calc(${({ height }) => height} / 2 - 2px);
    right: 14px;
    border-top: 7px solid ${({ theme }) => theme.COLORS.CHOCOLATE};
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }
`
StyledSelectWrapper.defaultProps = {
  height: '40px',
}
const StyledSelect = styled.select<StyledSelectProps>`
  -webkit-appearance: none;
  appearance: none;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding-left: 8px;
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
`
StyledSelect.defaultProps = {
  width: 'min(33.33vw, 480px)',
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
