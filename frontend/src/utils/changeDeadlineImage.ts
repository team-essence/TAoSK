import date from 'utils/date/date'
/**
 * 期限によって画像を変化
 *
 * @param {string} endDate
 * @param {number} listIndex
 * @param {number} listLength
 * @return {string} filePath
 */
export const changeDeadlineImage = (endDate: string, listIndex: number, listLength: number) => {
  let filePath = ''
  const isThreeDaysAgo = date.isThreeDaysAgo(endDate)
  const isYesterday = date.isYesterday(endDate)

  if (isThreeDaysAgo) {
    if (isYesterday) {
      listIndex === listLength - 1
        ? (filePath = '/svg/warning/normal.svg')
        : (filePath = '/svg/warning/over.svg')
    } else {
      filePath = '/svg/warning/warning.svg'
    }
  } else {
    filePath = '/svg/warning/normal.svg'
  }

  return filePath
}
