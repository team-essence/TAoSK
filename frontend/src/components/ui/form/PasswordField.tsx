import React, { FC, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { InputField, InputFieldProps } from 'components/ui/form/InputField'
import { CoarseButton } from 'components/ui/button/CoarseButton'

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
        outerAspect={{
          width: '53px',
          height: '30px',
        }}
        innerAspect={{
          width: '50.48px',
          height: '27px',
        }}
        outerBgColor={
          value
            ? convertIntoRGBA(theme.colors.temptress, 0.2)
            : convertIntoRGBA(theme.colors.alto, 0.55)
        }
        innerBgColor={
          value
            ? convertIntoRGBA(theme.colors.redOxide, 0.45)
            : convertIntoRGBA(theme.colors.nobel, 0.64)
        }
        color={theme.colors.silver}
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
  top: 32px;
  right: 7px;
`
