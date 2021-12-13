import { useEffect, useState, useMemo, useRef, RefObject, Dispatch, SetStateAction } from 'react'
import { useWatchInnerAspect } from 'hooks/useWatchInnerAspect'
import { useResizeObserver } from 'hooks/useResizeObserver'

type UseModalInterlockingScrollReturn = {
  leftColumnRef: RefObject<HTMLDivElement>
  rightColumnRef: RefObject<HTMLDivElement>
  scrollableRef: RefObject<HTMLDivElement>
  scrollHeight: number
}

export const useModalInterlockingScroll = (): UseModalInterlockingScrollReturn => {
  const { innerHeight } = useWatchInnerAspect()
  const [leftScrollableLength, setLeftScrollableLength] = useState<number>(0)
  const [rightScrollableLength, setRightScrollableLength] = useState<number>(0)
  const calculateScrollableLength = (
    element: Element,
    setLength: Dispatch<SetStateAction<number>>,
  ) => {
    const height = element.getBoundingClientRect().height
    const scrollHeight = element.scrollHeight
    setLength(scrollHeight - height)
  }
  const { ref: leftColumnRef } = useResizeObserver<HTMLDivElement>(elem =>
    calculateScrollableLength(elem, setLeftScrollableLength),
  )
  const { ref: rightColumnRef } = useResizeObserver<HTMLDivElement>(elem =>
    calculateScrollableLength(elem, setRightScrollableLength),
  )

  const scrollableRef = useRef<HTMLDivElement>(null)

  const scrollHeight = useMemo(() => {
    if (leftScrollableLength <= 0 && rightScrollableLength <= 0) return 0
    const scrollableLength = Math.max(leftScrollableLength, rightScrollableLength)

    return innerHeight + scrollableLength
  }, [leftScrollableLength, rightScrollableLength, innerHeight])

  useEffect(() => {
    const scrollModal = () => {
      if (!scrollableRef.current || !leftColumnRef.current || !rightColumnRef.current) return
      const scrollTop = scrollableRef.current.scrollTop
      leftColumnRef.current.scrollTop = scrollTop
      rightColumnRef.current.scrollTop = scrollTop
    }

    scrollableRef.current?.addEventListener('scroll', scrollModal, { passive: true })

    return () => scrollableRef.current?.removeEventListener('scroll', scrollModal)
  }, [scrollableRef.current])

  return { leftColumnRef, rightColumnRef, scrollableRef, scrollHeight }
}
