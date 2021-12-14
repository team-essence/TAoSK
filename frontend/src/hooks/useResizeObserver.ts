import { useRef, useEffect, RefObject } from 'react'

type UseResizeObserverReturn<T extends HTMLElement> = {
  ref: RefObject<T>
}

/**
 * ResizeObserverを使うためのフック
 */
export const useResizeObserver = <T extends HTMLElement>(
  func: (elm: Element) => void,
): UseResizeObserverReturn<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const obs = new ResizeObserver(entries => {
      func(entries[0].target)
    })
    obs.observe(ref.current)
    func(ref.current)

    return () => obs.disconnect()
  }, [ref.current])

  return { ref }
}
