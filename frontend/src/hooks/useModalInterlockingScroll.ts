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
type WhichWheeled = 'left' | 'right' | 'overlay' | 'none'

/**
 * スクロールバーを画面右端に置き、タスク編集モーダルの連動スクロールを実装するためのフック
 * @return {Object} {
 * leftColumnRef,
 * rightColumnRef,
 * leftColumnInnerRef,
 * rightColumnInnerRef,
 * scrollableRef,
 * scrollHeight,
  }
 * @return returns.scrollHeight - 画面右端にスクロールバーを置くにあたって、画面全体のoverlayに付与するheight
 */
export const useModalInterlockingScroll = (): UseModalInterlockingScrollReturn => {
  const { innerHeight } = useWatchInnerAspect()
  const scrollableRef = useRef<HTMLDivElement>(null)
  const preScrollTop = useRef<number>(0)
  const whichWheeled = useRef<WhichWheeled>('none')
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

  // 連動スクロール本体。overlayがスクロールされたらモーダル内部も連動してスクロールさせる
  useEffect(() => {
    const setWhichWheeled = (e: WheelEvent) => (whichWheeled.current = 'overlay')
    const scrollModal = () => {
      if (!scrollableRef.current || !leftColumnRef.current || !rightColumnRef.current) return
      const scrollTop = scrollableRef.current.scrollTop
      const scrollDiff = scrollTop - preScrollTop.current

      leftColumnRef.current.scrollTop += scrollDiff
      rightColumnRef.current.scrollTop += scrollDiff

      preScrollTop.current = scrollTop
    }

    scrollableRef.current?.addEventListener('wheel', setWhichWheeled, { passive: true })
    scrollableRef.current?.addEventListener('scroll', scrollModal, { passive: true })

    return () => {
      scrollableRef.current?.removeEventListener('wheel', setWhichWheeled)
      scrollableRef.current?.removeEventListener('scroll', scrollModal)
    }
  }, [scrollableRef.current])

  // モーダル内部から直接スクロールするのを禁止して、overlayにスクロールを一任することで連動スクロールを実装
  useEffect(() => {
    const fireOverlayScrollFactory = (which: 'left' | 'right') => {
      return (e: WheelEvent) => {
        whichWheeled.current = which
        e.preventDefault()
        if (scrollableRef.current) {
          const SCROLL_PER_DELTA = 0.8
          scrollableRef.current.scrollTop += e.deltaY * SCROLL_PER_DELTA
        }
      }
    }
    const fireOverlayScrollAtLeft = fireOverlayScrollFactory('left')
    const fireOverlayScrollAtRight = fireOverlayScrollFactory('right')
    const preventScroll = (e: Event) => {
      // 常にpreventDefaultしているとスクロールがカクつくので、モーダル内部でのスクロールのみ禁止
      // イベントは wheel -> scroll の順で発生するので, whichWheeledによる分岐がちゃんと働く
      if (whichWheeled.current !== 'overlay') e.preventDefault()
    }

    leftColumnRef.current?.addEventListener('wheel', fireOverlayScrollAtLeft, { passive: false })
    rightColumnRef.current?.addEventListener('wheel', fireOverlayScrollAtRight, { passive: false })
    leftColumnRef.current?.addEventListener('scroll', preventScroll, { passive: false })
    rightColumnRef.current?.addEventListener('scroll', preventScroll, { passive: false })

    return () => {
      leftColumnRef.current?.removeEventListener('wheel', fireOverlayScrollAtLeft)
      rightColumnRef.current?.removeEventListener('wheel', fireOverlayScrollAtRight)
      leftColumnRef.current?.removeEventListener('scroll', preventScroll)
      rightColumnRef.current?.removeEventListener('scroll', preventScroll)
    }
  }, [leftColumnRef.current, rightColumnRef.current])

  return {
    leftColumnRef,
    rightColumnRef,
    leftColumnInnerRef,
    rightColumnInnerRef,
    scrollableRef,
    scrollHeight,
  }
}
