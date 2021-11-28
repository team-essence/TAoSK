import { css, FlattenSimpleInterpolation } from 'styled-components'

const FIGMA_WIDTH_PX = 1440

/**
 * Figma の画面設計で使われている画面の width = 1440px に基づき、
 * 画面サイズ 1440px 未満の場合は Figma 上のサイズを vw に変換して表示し、
 * 1440px以上の場合は画面設計通りのサイズを表示する styled-component の css を生成する。
 * @param {TemplateStringsArray} targetStyleArray - TemplateStringsArray。バッククォートで指定する
 * @param {(...(string | undefined)[])} interpolations - ドル記号と波括弧で囲われたプレースホルダー
 * @returns {FlattenSimpleInterpolation} - 生成されたcss
 * @example
 * 下記が生成される
 * \@media screen and (max-width: 1440px) { width: 25vw; }
 * width: 360px;
    ```tsx
      <StyledDiv width='360px'>

      const StyledDiv = styled.div<{ width: string }>`
        ${({ width }) => generateStyleBasedOnFigma`
          width: ${width};
        `}
      `
    }
    ```
 */
export const generateStyleBasedOnFigma = (
  targetStyleArray: TemplateStringsArray,
  ...interpolations: (string | undefined)[]
): FlattenSimpleInterpolation => {
  const targetStyle = targetStyleArray.reduce((preStyle, currentStyle, index) => {
    return preStyle + currentStyle + (interpolations[index] ?? '')
  }, '')
  const oneLineStyle = targetStyle.replace(/\r\n|\n|\r/g, '')
  const declarations: string[] = oneLineStyle.split(';')
  const vwDeclarations: string = declarations.reduce(convertAllPxIntoVwReducer, '')

  return css`
    @media screen and (max-width: ${FIGMA_WIDTH_PX}px) {
      ${vwDeclarations}
    }
    ${targetStyle}
  `
}

const convertAllPxIntoVwReducer = (preDeclaration: string, declaration: string) => {
  const pxStrArray = declaration.match(/\d+(?:\.\d+)?(?=px)/g)
  if (!pxStrArray || !pxStrArray[0]) return preDeclaration + ''
  const vwDeclaration = pxStrArray.reduce(convertPxIntoVwReducer, declaration)
  return preDeclaration + vwDeclaration + ';'
}

const convertPxIntoVwReducer = (prePxStr: string, pxStr: string) => {
  const vwBasedOnFigma = `${(Number(pxStr) / FIGMA_WIDTH_PX) * 100}vw`
  return prePxStr.replace(`${pxStr}px`, vwBasedOnFigma)
}
