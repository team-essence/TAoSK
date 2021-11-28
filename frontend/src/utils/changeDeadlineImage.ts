import date from 'utils/date/date'
/**
 * 期限によって画像を変化
 *
 * @param {string} endDate
 * @return {string} filePath
 */
export const changeDeadlineImage = (endDate: string) => {
  let filePath = ''
  const isThreeDaysAgo = date.isThreeDaysAgo(endDate)
  const isYesterday = date.isYesterday(endDate)

  if (isThreeDaysAgo) {
    if (isYesterday) {
      filePath = '/svg/warning/over.svg'
    } else {
      filePath = '/svg/warning/warning.svg'
    }
  } else {
    filePath = '/svg/warning/normal.svg'
  }

  return filePath
}
