import React, { FC, InputHTMLAttributes, ReactNode, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { InputField } from 'components/ui/form/InputField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
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
          aspect={{
            width: calculateMinSizeBasedOnFigmaWidth(53),
            height: calculateMinSizeBasedOnFigmaWidth(30),
          }}
          outerBgColor={
            value
              ? convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)
              : convertIntoRGBA(theme.COLORS.ALTO, 0.55)
          }
          innerBgColor={
            value
              ? convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)
              : convertIntoRGBA(theme.COLORS.NOBEL, 0.64)
          }
          color={!value ? theme.COLORS.SILVER : theme.COLORS.BRANDY}
          onClick={() => setShouldShowPassword(!shouldShowPassword)}
          isDisabled={!value}
        />
      </InputField>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: relative;
`
const StyledCoarseButton = styled(CoarseButton)`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(5)};
  right: ${calculateMinSizeBasedOnFigmaWidth(7)};
`
