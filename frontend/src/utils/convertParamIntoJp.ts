import { STATUS_TYPE } from 'consts/status'
import { StatusParam } from 'types/status'

/**
 * パラメータを日本語に変換
 *
 * @param {StatusParam} param
 */
export const convertParamIntoJp = (param: StatusParam) => {
  switch (param) {
    case STATUS_TYPE.TECHNOLOGY:
      return '技術力'
    case STATUS_TYPE.ACHIEVEMENT:
      return '達成力'
    case STATUS_TYPE.SOLUTION:
      return '解決力'
    case STATUS_TYPE.MOTIVATION:
      return '意欲'
    case STATUS_TYPE.DESIGN:
      return 'デザイン'
    case STATUS_TYPE.PLAN:
      return '設計力'
  }
}
