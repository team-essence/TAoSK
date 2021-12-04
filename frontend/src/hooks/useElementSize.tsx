import { useState, useRef, useEffect } from 'react'

type UseElementSizeReturn<T extends HTMLElement> = {
  sizeInspectedEl: React.RefObject<T>
  width: number
  height: number
}

/**
 * 要素のwidth,heightをstateで返す
 * @return {UseElementSizeReturn<T>} {
 * sizeInspectedEl: タグのrefと繋げる,
 * width: 要素のwidth,
 * height: 要素のheight,
 * }
 */
export const useElementSize = <T extends HTMLElement>(): UseElementSizeReturn<T> => {
  const sizeInspectedEl = useRef<T>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (sizeInspectedEl?.current) {
      const { width, height } = sizeInspectedEl.current.getBoundingClientRect()
      setWidth(width)
      setHeight(height)
    }
  }, [sizeInspectedEl])

  return { sizeInspectedEl, width, height }
}
