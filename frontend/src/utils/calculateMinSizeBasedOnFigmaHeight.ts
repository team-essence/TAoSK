type pxStr = `${number}px`

/**
 * Figma の画面設計で指定されている px を、画面設計上の height (900px) 準拠でvw に変換し、
 * 画面サイズが 1440px 以上だったら px, それ未満だったら vw になるような
 * css の min 関数を返却する
 * @param {number | pxStr} px - number | '${number}px'
 * @returns {string} 'min(${numPx}px, ${vh})'
 */
export const calculateMinSizeBasedOnFigmaHeight = (px: number | pxStr): string => {
  const FIGMA_HEIGHT_PX = 900
  const numPx = typeof px === 'string' ? Number(px.replace('px', '')) : px

  const vh = `${(numPx / FIGMA_HEIGHT_PX) * 100}vh`

  return `min(${numPx}px, ${vh})`
}
