export const calculateVwFromStandardSize = (px: number) => {
  const FIGMA_WIDTH_PX = 1440
  return `${(px / FIGMA_WIDTH_PX) * 100}vw`
}
