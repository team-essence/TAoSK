import { useState, useLayoutEffect } from 'react'

type UseWatchInnerAspectReturn = {
  innerWidth: number
  innerHeight: number
}

export const useWatchInnerAspect = (): UseWatchInnerAspectReturn => {
  const [innerWidth, setInnerWidth] = useState<number>(0)
  const [innerHeight, setInnerHeight] = useState<number>(0)

  const resize = () => {
    setInnerWidth(window.innerWidth)
    setInnerHeight(window.innerHeight)
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', resize)
    resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return { innerWidth, innerHeight }
}
