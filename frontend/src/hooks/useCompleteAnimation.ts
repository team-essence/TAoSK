import { useEffect, useRef, RefObject } from 'react'
import technology from 'components/models/task/animation/config/anim_technology.json'
import plan from 'components/models/task/animation/config/anim_plan.json'
import lottie from 'lottie-web'

type JsonType = typeof plan | typeof technology

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
