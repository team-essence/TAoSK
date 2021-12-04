import { STATUS_TYPE } from 'consts/status'

export type StatusParam = typeof STATUS_TYPE[keyof typeof STATUS_TYPE]

export type Params = {
  param: StatusParam
  value: number
}
