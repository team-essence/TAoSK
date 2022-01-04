import { useState, useEffect, useRef, RefObject, Dispatch, SetStateAction } from 'react'
import { JsonType } from 'types/completeAnimation'
import lottie from 'lottie-web'

type UseCompleteAnimationReturn<T extends HTMLElement> = {
  anchorEl: RefObject<T>
  isCompleted: boolean
  setIsCompleted: Dispatch<SetStateAction<boolean>>
}

/**
 * タスク完了時にアニメーションのJSONを受け取ってDOMに設定する
 * @param { JsonType } json
 * @returns { RefObject<T> } anchorEl アニメーションを再生するDOMのrefと繋げる
 * @returns { boolean } isCompleted タスクが完了したか
 * @returns { Dispatch<SetStateAction<boolean>> } setIsCompleted タスクの完了を制御
 */

export const useCompleteAnimation = <T extends HTMLElement>(
  json: JsonType,
): UseCompleteAnimationReturn<T> => {
  const anchorEl = useRef<T>(null)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (!json || !anchorEl.current) return

    const animation = lottie.loadAnimation({
      container: anchorEl.current,
      renderer: 'svg',
      loop: false,
      animationData: JSON.parse(JSON.stringify(json) || 'null'),
    })

    animation.addEventListener('complete', () => {
      setIsCompleted(false)
    })

    return () => {
      lottie.stop()
      animation.removeEventListener('complete')
    }
  }, [json, anchorEl.current])

  return { anchorEl, isCompleted, setIsCompleted }
}
