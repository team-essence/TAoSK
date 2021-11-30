type pxStr = `${number}px`

/**
 * Figma の画面設計で指定されている px を、画面設計上の height (900px) 準拠でvhに変換し返却
 * @param {number | pxStr} px - number | '${number}px'
 * @returns {string} '${number}vh'
 */
export const calculateVhBasedOnFigma = (px: number | pxStr): string => {
  const FIGMA_HEIGHT_PX = 900
  const numPx = typeof px === 'string' ? Number(px.replace('px', '')) : px

  return `${(numPx / FIGMA_HEIGHT_PX) * 100}vh`
}
