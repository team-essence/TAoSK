import { PROJECT_LIST_BODY_FIGMA_WIDTH, PROJECT_LIST_DETAIL_MARGIN_LEFT } from 'consts/aspect'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateVwBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'

export const projectListBodyWidth = calculateMinSizeBasedOnFigmaWidth(PROJECT_LIST_BODY_FIGMA_WIDTH)
export const projectListDetailMarginLeft = calculateMinSizeBasedOnFigmaWidth(
  PROJECT_LIST_DETAIL_MARGIN_LEFT,
)

/**
 * プロジェクト一覧画面の詳細部分で、画面幅1440px以上の時に画面幅に合うようサイズを引き伸ばし、画面幅2560px以上になったら2560pxの時の値で固定するようなwidthを算出する
 */
export const calculateProjectListDetailWidth = (
  target: Parameters<typeof calculateVwBasedOnFigma>[0],
) => {
  const targetVwWidth = calculateVwBasedOnFigma(target)
  const listVwWidth = calculateVwBasedOnFigma(PROJECT_LIST_BODY_FIGMA_WIDTH)
  const listDetailVwMarginLeft = calculateVwBasedOnFigma(PROJECT_LIST_DETAIL_MARGIN_LEFT)
  const listWidthDiff = `(${listVwWidth} - ${projectListBodyWidth})`
  const listDetailMarginLeftDiff = `(${listDetailVwMarginLeft} - ${projectListDetailMarginLeft})`

  return `calc(${targetVwWidth} + ${listWidthDiff} + ${listDetailMarginLeftDiff})`
}
