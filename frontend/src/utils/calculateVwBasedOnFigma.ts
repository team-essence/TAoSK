type pxStr = `${number}px`

export const calculateVwBasedOnFigma = (px: number | pxStr) => {
  const FIGMA_WIDTH_PX = 1440
  const numPx = typeof px === 'string' ? Number(px.replace('px', '')) : px

  return `${(numPx / FIGMA_WIDTH_PX) * 100}vw`
}
