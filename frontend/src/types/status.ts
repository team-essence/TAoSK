import { STATUS_TYPE } from 'consts/status'

export type StatusParam = typeof STATUS_TYPE[keyof typeof STATUS_TYPE]

export type Params = {
  param: StatusParam
  value: number
}

export const assertStatusParam = (statusParam: string): statusParam is StatusParam => {
  switch (statusParam) {
    case STATUS_TYPE.TECHNOLOGY:
    case STATUS_TYPE.ACHIEVEMENT:
    case STATUS_TYPE.SOLUTION:
    case STATUS_TYPE.MOTIVATION:
    case STATUS_TYPE.DESIGN:
    case STATUS_TYPE.PLAN:
      return true
    default:
      return false
  }
}
