/**
 * リストの位置によって武器の画像を変化
 *
 * @param {number} listIndex
 * @param {number} listLength
 * @param {string} param
 * @return {string} file path
 */
export const changeWeapon = (listIndex: number, listLength: number, param: string) => {
  let filePath = ''
  if (listIndex === 0) {
    filePath = `/images/weapon/${param}.svg`
  } else if (listIndex < listLength && listIndex !== listLength - 1) {
    filePath = `/images/weapon/progress-${param}.svg`
  } else {
    filePath = ''
  }

  return filePath
}
