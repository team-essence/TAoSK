import { toast, ToastOptions } from 'react-toastify';

const toastOption: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};

class ToastUtil {
  /**
   * toast info type
   * @param {string} text [表示テキスト]
   */
  public static info(text: string) {
    return toast.info(text, toastOption);
  }

  /**
   * toast success type
   * @param {string} text [表示テキスト]
   */
  public static success(text: string) {
    return toast.success(text, toastOption);
  }

  /**
   * toast warning type
   * @param {string} text [表示テキスト]
   */
  public static warning(text: string) {
    return toast.warn(text, toastOption);
  }

  /**
   * toast error type
   * @param {string} text [表示テキスト]
   */
  public static error(text: string) {
    return toast.error(text, toastOption);
  }

  /**
   * toast default type
   * @param {string} text [表示テキスト]
   */
  public static default(text: string) {
    return toast(text, toastOption);
  }

  /**
   * toast dark type
   * @param {string} text [表示テキスト]
   */
  public static dark(text: string) {
    return toast.dark(text, toastOption);
  }
}

export default ToastUtil;
