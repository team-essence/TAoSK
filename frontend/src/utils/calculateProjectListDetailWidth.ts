import {
  PROJECT_LIST_BODY_FIGMA_WIDTH,
  PROJECT_LIST_DETAIL_MARGIN_LEFT,
  MAX_WIDTH,
} from 'consts/aspect'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateVwBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'

export const projectListBodyWidth = calculateMinSizeBasedOnFigmaWidth(PROJECT_LIST_BODY_FIGMA_WIDTH)
export const projectListDetailMarginLeft = calculateMinSizeBasedOnFigmaWidth(
  PROJECT_LIST_DETAIL_MARGIN_LEFT,
)

export const calculateProjectListDetailWidth = (
  target: Parameters<typeof calculateVwBasedOnFigma>[0],
) => {
  const targetVwWidth = calculateVwBasedOnFigma(target)
  const listVwWidth = calculateVwBasedOnFigma(PROJECT_LIST_BODY_FIGMA_WIDTH)
  const listDetailVwMarginLeft = calculateVwBasedOnFigma(PROJECT_LIST_DETAIL_MARGIN_LEFT)
  const listWidthDiff = `(${listVwWidth} - ${projectListBodyWidth})`
  const listDetailMarginLeftDiff = `(${listDetailVwMarginLeft} - ${projectListDetailMarginLeft})`

  return `min(calc(${targetVwWidth} + ${listWidthDiff} + ${listDetailMarginLeftDiff}), ${MAX_WIDTH}px)`
}
