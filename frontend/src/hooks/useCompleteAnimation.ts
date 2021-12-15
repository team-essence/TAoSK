import { useState, useRef } from 'react'
import lottie from 'lottie-web'

// type UseCompleteAnimationReturn = {

// }

export const useCompleteAnimation = () => {
  const inspectedEl = useRef<HTMLDivElement>(null)

  const start = async <T>(json: T) => {
    const animation = lottie.loadAnimation({
      container: inspectedEl.current as HTMLDivElement,
      animationData: json,
      renderer: 'svg',
      loop: false,
    })

    animation.stop()
    animation.play()
  }

  return { inspectedEl, start }
}
