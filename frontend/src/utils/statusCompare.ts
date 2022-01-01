import { STATUS_TYPE } from 'consts/status'
import { StatusParam } from 'types/status'

/** StatusParamが格納された配列をSTATUS_TYPEのオブジェクトの順番通りに並び替える */
export const statusCompare = (a: StatusParam, b: StatusParam) =>
  Object.values(STATUS_TYPE).indexOf(a) - Object.values(STATUS_TYPE).indexOf(b)
