import { useEffect, useRef, RefObject } from 'react'
import { JsonType } from 'types/completeAnimation'
import lottie from 'lottie-web'

type UseCompleteAnimationReturn<T extends HTMLElement> = {
  anchorEl: RefObject<T>
}

export const useCompleteAnimation = <T extends HTMLElement>(
  json: JsonType,
): UseCompleteAnimationReturn<T> => {
  const anchorEl = useRef<T>(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: anchorEl.current as T,
      renderer: 'svg',
      loop: false,
      animationData: json,
    })

    return () => lottie.stop()
  }, [json])

  return { anchorEl }
}
