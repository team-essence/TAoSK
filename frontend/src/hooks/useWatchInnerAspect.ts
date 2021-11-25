import { useState, useLayoutEffect } from 'react'

type UseWatchInnerAspectResult = {
  innerWidth: number
  innerHeight: number
}

/**
 * 画面サイズの変更を検知して、window.innerWidth, window.innerHeight を state で返す
 * @returns { Object } returns
 * @returns { number } returns.innerWidth - window.innerWidth の state
 * @returns { number } returns.innerHeight- window.innerHeight の state
 */
export const useWatchInnerAspect = (): UseWatchInnerAspectResult => {
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
