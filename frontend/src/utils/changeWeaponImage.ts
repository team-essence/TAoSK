/**
 * リストの位置によって武器の画像を変化
 *
 * @param {number} listIndex
 * @param {number} listLength
 * @param {string} param
 * @return {string} filePath
 */
export const changeWeaponImage = (listIndex: number, listLength: number, param: string) => {
  let filePath = ''
  if (listIndex === 0) {
    filePath = `/svg/weapon/${param}.svg`
  } else if (listIndex < listLength && listIndex !== listLength - 1) {
    filePath = `/svg/weapon/progress-${param}.svg`
  } else {
    filePath = `/svg/weapon/${param}-clear.svg`
  }

  return filePath
}
