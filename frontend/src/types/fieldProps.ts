import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

export type StyledLabelProps = { color?: string; fontSize?: string }
export type FieldProps<T, U extends string> = {
  className?: string
  marginBottom: string
  labelStyles?: StyledLabelProps
  label?: string
  error?: FieldError | undefined
  errorColor?: string
  description?: string
  registration: Partial<UseFormRegisterReturn>
  required?: boolean
  type?: 'text' | 'email' | 'password'
} & T & { [key in `${U}Styles`]?: string }
