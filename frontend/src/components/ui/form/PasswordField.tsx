import React, { FC, InputHTMLAttributes, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { InputField } from 'components/ui/form/InputField'
import type { FieldProps } from 'types/fieldProps'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { generateStyleBasedOnFigma } from 'utils/calculateVwBasedOnFigma'

type StyledBoxProps = {
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  backgroundColor?: string
}
type InputFieldProps = FieldProps<InputHTMLAttributes<HTMLInputElement>, 'input', StyledBoxProps>
type Props = { type?: 'text' | 'password' } & InputFieldProps

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
        onChange={onChange}
      />
      <StyledCoarseButton
        text={shouldShowPassword ? '非表示' : '表示'}
        aspect={{
          width: '53px',
          height: '30px',
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
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: relative;
`
const StyledCoarseButton = styled(CoarseButton)`
  position: absolute;
  ${generateStyleBasedOnFigma`
    top: 36px;
    right: 7px;
  `}
`
