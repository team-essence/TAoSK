import { isAfter, formatDistanceToNow, differenceInDays, format } from 'date-fns'

import ja from 'date-fns/locale/ja'
import logger from 'utils/debugger/logger'

type PropsDate = Date | string | number

export default class date {
  /**
   * get today
   *
   * @static
   * @return {string} [yyyy-mm-ddの形で今日を返す]
   * @memberof date
   */
  public static getToday(): string {
    const today = new Date()
    today.setDate(today.getDate())
    const yyyy = today.getFullYear()
    const mm = ('0' + (today.getMonth() + 1)).slice(-2)
    const dd = ('0' + today.getDate()).slice(-2)
    return `${yyyy}-${mm}-${dd}`
  }

  /**
   * is yesterday
   *
   * @static
   * @param {PropsDate} date
   * @return {boolean}  {引数が今日より前であればtrue}
   * @memberof date
   */
  public static isYesterday(date: PropsDate): boolean {
    return isAfter(new Date(), new Date(date))
  }

  /**
   * format distance
   *
   * @static
   * @param {PropsDate} date
   * @return {string} [経過時間]
   * @memberof date
   */
  public static formatDistance = (date: PropsDate): string => {
    // BUG: データベースから取得した日付にタイムゾーンを適応して、日本との時間の差９時間を足してしまう
    const utcDate = new Date(date)
    const jstDate = utcDate.toLocaleString('ja-JP', { timeZone: 'Europe/London' })
    return formatDistanceToNow(new Date(jstDate), { addSuffix: true, locale: ja })
  }

  /**
   * is three days ago
   *
   * @static
   * @param {PropsDate} date
   * @return {number} [今日から何日前か]
   * @memberof date
   */
  public static isThreeDaysAgo = (date: PropsDate): boolean => {
    return differenceInDays(new Date(), new Date(date)) >= -3 ? true : false
  }

  /**
   * format day
   *
   * @static
   * @param {PropsData} date
   * @return {string} [yyyy年MM月dd日の形に整形]
   * @memberof date
   */
  public static formatDay = (date: PropsDate): string => {
    return format(new Date(date), 'yyyy年MM月dd日')
  }

  /**
   * project span
   *
   * @static
   * @param {PropsDate} startDate [プロジェクト開始日]
   * @param {PropsDate} endDate [プロジェクト終了日]
   * @memberof date [yyyy年MM月dd日 ~ yyyy年MM月dd日]
   */
  public static projectSpan = (startDate: PropsDate, endDate: PropsDate) => {
    return `${date.formatDay(startDate)} ~ ${date.formatDay(endDate)}`
  }
}
