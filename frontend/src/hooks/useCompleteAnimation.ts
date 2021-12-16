import { useState, useEffect, useRef, RefObject, Dispatch, SetStateAction } from 'react'
import { JsonType } from 'types/completeAnimation'
import lottie from 'lottie-web'

type UseCompleteAnimationReturn<T extends HTMLElement> = {
  anchorEl: RefObject<T>
  isCompleted: boolean
  setIsCompleted: Dispatch<SetStateAction<boolean>>
}

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
      animationData: JSON.parse(JSON.stringify(json)),
    })

    animation.addEventListener('complete', () => {
      setIsCompleted(false)
    })

    return () => {
      lottie.stop()
      animation.removeEventListener('complete')
    }
  }, [json, anchorEl.current])

  return {
    anchorEl,
    isCompleted,
    setIsCompleted,
  }
}
