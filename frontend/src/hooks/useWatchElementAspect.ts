import { createRef, useLayoutEffect, useState, RefObject } from 'react'

type UseWatchElementWidthReturn<T extends HTMLElement> = {
  sizeInspectedEl: RefObject<T>
  width: number
  height: number
}

/**
 * 要素のwidth,heightをstateで返す
 * @return {UseElementSizeReturn<T>} {
 *   sizeInspectedEl: タグのrefと繋げる,
 *   width: 要素のwidth,
 *   height: 要素のheight,
 * }
 */
export const useWatchElementAspect = <T extends HTMLElement>(): UseWatchElementWidthReturn<T> => {
  const sizeInspectedEl = createRef<T>()
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useLayoutEffect(() => {
    if (!sizeInspectedEl.current) return

    const obs = new ResizeObserver(entries => {
      // clientRectでは小数点以下が切り捨てられてしまうためgetBoundingClientRectを使用
      // setWidth(entries[0].target.getBoundingClientRect().width)
      // setHeight(entries[0].target.getBoundingClientRect().height)
    })
    obs.observe(sizeInspectedEl.current)

    setWidth(sizeInspectedEl.current.getBoundingClientRect().width)
    setHeight(sizeInspectedEl.current.getBoundingClientRect().height)

    return () => obs.disconnect()
  }, [sizeInspectedEl])

  return { sizeInspectedEl, width, height }
}
