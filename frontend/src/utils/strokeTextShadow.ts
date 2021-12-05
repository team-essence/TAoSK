import { css, FlattenSimpleInterpolation } from 'styled-components'

/**
 * 指定したpx数の太さの縁取り文字を形作る text-shadow のcssを返す
 * @param {`${number}px`} width - 太さ
 * @param {string} color - 色
 * @return {FlattenSimpleInterpolation} - text-shadowのcss
 */
export const strokeTextShadow = (
  width: `${number}px`,
  color: string,
): FlattenSimpleInterpolation => {
  const pxNum = Number(width.match(/\d+(?:\.\d+)?(?=px)/)?.[0] ?? 0)
  const offSets: number[][] = pushAllOffsetAround(pxNum)

  const style = offSets.reduce((preOffset, currentOffset, index) => {
    const endStr = index === offSets.length - 1 ? ';' : ', '
    return preOffset + `${color} ${currentOffset[0]}px ${currentOffset[1]}px` + endStr
  }, '')

  return css`
    text-shadow: ${style};
  `
}

const pushAllOffsetAround = (pxNum: number): number[][] => {
  const offSets: number[][] = []

  for (let i = 0; i <= Math.abs(pxNum * 2); i++) {
    if (i === 0) {
      offSets.push([pxNum, pxNum])
      offSets.push([-pxNum, -pxNum])
    } else if (i === Math.abs(pxNum * 2)) {
      offSets.push([pxNum - i, pxNum])
      offSets.push([pxNum, pxNum - i])
    } else {
      offSets.push([pxNum - i, pxNum])
      offSets.push([pxNum, pxNum - i])
      offSets.push([-pxNum, -pxNum + i])
      offSets.push([-pxNum + i, -pxNum])
    }
  }

  return offSets
}
