import React, { FC, InputHTMLAttributes, ReactNode, useState, ChangeEvent } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { InputField } from 'components/ui/form/InputField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
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
  type?: 'text' | 'password'
} & InputHTMLAttributes<HTMLInputElement>

export const PasswordField: FC<Props> = ({
  className,
  type = 'password',
  registration,
  ...inputFieldProps
}) => {
  const [value, setValue] = useState<string>('')
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(type === 'text')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    registration.onChange && registration.onChange(e)
    inputFieldProps.onChange && inputFieldProps.onChange(e)
    setValue(e.target.value)
  }

  return (
    <StyledWrapper className={className}>
      <InputField
        {...inputFieldProps}
        registration={registration}
        type={shouldShowPassword ? 'text' : 'password'}
        onChange={onChange}>
        <StyledCoarseButton
          text={shouldShowPassword ? '非表示' : '表示'}
          onClick={() => setShouldShowPassword(!shouldShowPassword)}
          disabled={!value}
        />
      </InputField>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: relative;
`
type Disabled = { disabled: boolean }
const StyledCoarseButton = styled(CoarseButton).attrs<Disabled>(({ disabled }) => ({
  disabled,
}))<Disabled>`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigma(5)};
  right: ${calculateMinSizeBasedOnFigma(7)};
  width: ${calculateMinSizeBasedOnFigma(53)};
  height: ${calculateMinSizeBasedOnFigma(30)};
  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        color: ${theme.COLORS.SILVER};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.ALTO, 0.55)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.NOBEL, 0.64)};
          }
        }
      `
    } else {
      return css`
        color: ${theme.COLORS.BRANDY};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)};
          }
        }
      `
    }
  }}
`
