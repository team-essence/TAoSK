import { toast as toastFunc, ToastOptions } from 'react-toastify'

const toastOption: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
}

class toast {
  /**
   * toast info type
   *
   * @static
   * @param {string} text [表示テキスト]
   * @memberof toast
   */
  public static info(text: string) {
    return toastFunc.info(text, toastOption)
  }

  /**
   * toast success type
   *
   * @static
   * @param {string} text [表示テキスト]
   * @memberof toast
   */
  public static success(text: string) {
    return toastFunc.success(text, toastOption)
  }

  /**
   * toast warning type
   *
   * @static
   * @param {string} text [表示テキスト]
   * @memberof toast
   */
  public static warning(text: string) {
    return toastFunc.warn(text, toastOption)
  }

  /**
   * toast error type
   *
   * @static
   * @param {string} text [表示テキスト]
   * @memberof toast
   */
  public static error(text: string) {
    return toastFunc.error(text, toastOption)
  }

  /**
   * toast default type
   *
   * @static
   * @param {string} text [表示テキスト]
   * @memberof toast
   */
  public static default(text: string) {
    return toastFunc(text, toastOption)
  }

  /**
   * toast dark type
   *
   * @static
   * @param {string} text [表示テキスト]
   * @memberof toast
   */
  public static dark(text: string) {
    return toastFunc.dark(text, toastOption)
  }
}

export default toast
