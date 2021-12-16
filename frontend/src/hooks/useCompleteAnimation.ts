import { useState, useEffect, useRef, RefObject, Dispatch, SetStateAction } from 'react'
import { JsonType } from 'types/completeAnimation'
import lottie from 'lottie-web'

type UseCompleteAnimationReturn<T extends HTMLElement> = {
  anchorEl: RefObject<T>
  // isComplete: boolean
  // setIsComplete: Dispatch<SetStateAction<boolean>>
}

export const useCompleteAnimation = <T extends HTMLElement>(
  json: JsonType,
): UseCompleteAnimationReturn<T> => {
  const anchorEl = useRef<T>(null)
  // このstate親で使いたいから親側でこのhookを呼べないと困る
  // const [isComplete, setIsComplete] = useState<boolean>(false)

  useEffect(() => {
    lottie.loadAnimation({
      container: anchorEl.current as T,
      renderer: 'svg',
      loop: false,
      animationData: JSON.parse(JSON.stringify(json)),
    })

    // animation.addEventListener('complete', () => {
    //   // setIsComplete(true)
    // })

    return () => {
      lottie.stop()
      // animation.removeEventListener('complete')
    }
  }, [json])

  return {
    anchorEl,
    // isComplete, setIsComplete
  }
}
