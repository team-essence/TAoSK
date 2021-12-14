/**
 * オブジェクトの等値チェックを行う
 */
export const isEqual = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b)
