import { css, FlattenSimpleInterpolation } from 'styled-components'

const FIGMA_WIDTH_PX = 1440

type pxStr = `${number}px`
export const calculateVwBasedOnFigma = (px: number | pxStr) => {
  const numPx = typeof px === 'string' ? Number(px.replace('px', '')) : px

  return `${(numPx / FIGMA_WIDTH_PX) * 100}vw`
}

/**
 * Figma の画面設計で使われている画面の width = 1440px に基づき、
 * 画面サイズ 1440px 未満の場合は Figma 上のサイズを vw に変換して表示し、
 * 1440px以上の場合は画面設計通りのサイズを表示する styled-component の css を生成する。
 * @param {string} targetStyle - string
 * @returns {ThemedCssFunction<DefaultTheme>} -
 */
export const generateStyleBasedOnFigma = (targetStyle: string): FlattenSimpleInterpolation => {
  const oneLineStyle = targetStyle.replace(/\r\n|\n|\r/g, '')
  const declarations = oneLineStyle.split(';')
  const vwDeclarations: string = declarations.reduce(convertAllPxIntoVwReducer, '')

  return css`
    @media (max-width: ${FIGMA_WIDTH_PX}px) {
      ${vwDeclarations}
    }
    ${targetStyle}
  `
}

const convertAllPxIntoVwReducer = (preDeclaration: string, declaration: string) => {
  const pxStrArray = declaration.match(/\d+(?=px)/g)
  if (!pxStrArray || !pxStrArray[0]) return preDeclaration + ''
  const vwDeclaration = pxStrArray.reduce(convertPxIntoVwReducer, declaration)
  return preDeclaration + vwDeclaration + ';'
}

const convertPxIntoVwReducer = (prePxStr: string, pxStr: string) => {
  const vwBasedOnFigma = `${(Number(pxStr) / FIGMA_WIDTH_PX) * 100}vw`
  return prePxStr.replace(`${pxStr}px`, vwBasedOnFigma)
}
