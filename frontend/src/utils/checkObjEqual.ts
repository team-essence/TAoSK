/**
 * オブジェクトの等値チェックを行う
 * ※ シャローチェックなので、深くまでチェックする場合は別の処理が必要
 */
export const checkObjEqual = <T>(a: T, b: T) => {
  const aJSON = JSON.stringify(Object.entries(a).sort())
  const bJSON = JSON.stringify(Object.entries(b).sort())

  return aJSON === bJSON
}
