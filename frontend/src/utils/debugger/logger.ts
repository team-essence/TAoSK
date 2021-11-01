/**
 * consoleを使う場合はこちらを利用する
 *
 */
export default class logger {
  public static debug(message?: any, ...optionalParams: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(message, optionalParams);
    }
  }

  public static table(message?: any, ...optionalParams: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.table(message, optionalParams);
    }
  }
}
