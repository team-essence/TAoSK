import { isAfter, formatDistanceToNow, differenceInDays, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

type PropsDate = Date | string | number

export default class date {
  /**
   * get today
   *
   * @static
   * @return {string} [yyyy-mm-ddの形で返す]
   * @memberof date
   */
  public static getToday(): string {
    const today = new Date()
    today.setDate(today.getDate())
    const yyyy = today.getFullYear()
    const mm = ('0' + (today.getMonth() + 1)).slice(-2)
    const dd = ('0' + today.getDate()).slice(-2)
    return `${yyyy}/${mm}/${dd}`
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
    return formatDistanceToNow(new Date(date), { locale: ja })
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

  public static formatDate = (date: PropsDate) => {
    return format(new Date(date), 'MM月dd日')
  }
}
