import React, {
  FCX,
  useEffect,
  TextareaHTMLAttributes,
  useState,
  FocusEvent,
  ReactNode,
} from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

type Props = {
  label?: string
  error?: FieldError | undefined
  children?: ReactNode
  registration: Partial<UseFormRegisterReturn>
  errorColor?: string
  required?: boolean
  type?: 'text' | 'email' | 'password'
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextAreaField: FCX<Props> = ({
  className,
  errorColor = theme.COLORS.ERROR,
  label,
  registration,
  error,
  required = true,
  children,
  ...textAreaAttributes
}) => {
  const [hasBlurred, setHasBlurred] = useState<boolean>(false)

  const shouldShowError = !!(hasBlurred && error?.message)
  const onBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    textAreaAttributes.onBlur && textAreaAttributes.onBlur(e)
    setHasBlurred(true)
  }

  useEffect(() => {
    return () => setHasBlurred(false)
  }, [])

  return (
    <div className={className}>
      <StyledLabelWrapper marginBottom={shouldShowError ? '0px' : calculateMinSizeBasedOnFigma(24)}>
        <label color={shouldShowError ? errorColor : undefined}>
          {label}
          <StyledRequiredSpan> {required ? '*' : ''} </StyledRequiredSpan>
          <StyledTextareaWrapper shouldShowError={shouldShowError} errorColor={errorColor}>
            <textarea {...registration} {...textAreaAttributes} onBlur={onBlur} />
            {children}
          </StyledTextareaWrapper>
        </label>
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
const StyledTextareaWrapper = styled.div<{ shouldShowError: boolean; errorColor: string }>`
  position: relative;
  margin-top: ${calculateMinSizeBasedOnFigma(4)};
  textarea {
    resize: none;
    padding: ${calculateMinSizeBasedOnFigma(9.24)} ${calculateMinSizeBasedOnFigma(8)};
    border-color: ${props => (props.shouldShowError ? props.errorColor : undefined)} !important;
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
