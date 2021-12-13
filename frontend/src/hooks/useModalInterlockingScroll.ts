import { useEffect, useState, useMemo, useRef, RefObject } from 'react'
import { useWatchInnerAspect } from 'hooks/useWatchInnerAspect'
import { useResizeObserver } from 'hooks/useResizeObserver'

type UseModalInterlockingScrollReturn = {
  leftColumnRef: RefObject<HTMLDivElement>
  rightColumnRef: RefObject<HTMLDivElement>
  leftColumnInnerRef: RefObject<HTMLDivElement>
  rightColumnInnerRef: RefObject<HTMLDivElement>
  scrollableRef: RefObject<HTMLDivElement>
  scrollHeight: number
}

export const useModalInterlockingScroll = (): UseModalInterlockingScrollReturn => {
  const { innerHeight } = useWatchInnerAspect()
  const scrollableRef = useRef<HTMLDivElement>(null)
  const [leftColumnHeight, setLeftColumnHeight] = useState<number>(0)
  const [rightColumnHeight, setRightColumnHeight] = useState<number>(0)
  const [leftColumnInnerHeight, setLeftColumnInnerHeight] = useState<number>(0)
  const [rightColumnInnerHeight, setRightColumnInnerHeight] = useState<number>(0)

  const { ref: leftColumnRef } = useResizeObserver<HTMLDivElement>(elem =>
    setLeftColumnHeight(elem.clientHeight),
  )
  const { ref: rightColumnRef } = useResizeObserver<HTMLDivElement>(elem =>
    setRightColumnHeight(elem.clientHeight),
  )
  // ResizeObserverではscrollHeightの変更を検知できないのでinnerRefを作成し内部のスクロール領域を監視
  const { ref: leftColumnInnerRef } = useResizeObserver<HTMLDivElement>(elem =>
    setLeftColumnInnerHeight(elem.clientHeight),
  )
  const { ref: rightColumnInnerRef } = useResizeObserver<HTMLDivElement>(elem =>
    setRightColumnInnerHeight(elem.clientHeight),
  )
  const leftScrollableLength = useMemo<number>(
    () => leftColumnInnerHeight - leftColumnHeight,
    [leftColumnInnerHeight, leftColumnHeight],
  )
  const rightScrollableLength = useMemo<number>(
    () => rightColumnInnerHeight - rightColumnHeight,
    [rightColumnInnerHeight, rightColumnHeight],
  )
  const scrollHeight = useMemo<number>(() => {
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

  return {
    leftColumnRef,
    rightColumnRef,
    leftColumnInnerRef,
    rightColumnInnerRef,
    scrollableRef,
    scrollHeight,
  }
}
