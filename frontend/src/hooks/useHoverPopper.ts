import { useState, useCallback, MouseEvent } from 'react'
import { useHover } from 'hooks/useHover'

type UseHoverPopperReturn = {
  anchorEl: HTMLElement | null
  hovered: boolean
  onMouseOver: (e: MouseEvent<HTMLElement>) => void
  onMouseOut: () => void
}

export const useHoverPopper = (): UseHoverPopperReturn => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [hovered, eventHoverHandlers] = useHover()

  const onMouseOver = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (e.target instanceof HTMLElement) setAnchorEl(e.target)
      eventHoverHandlers.onMouseOver()
    },
    [eventHoverHandlers.onMouseOver],
  )

  const onMouseOut = useCallback(() => {
    eventHoverHandlers.onMouseOut()
  }, [eventHoverHandlers.onMouseOut])

  return { anchorEl, hovered, onMouseOver, onMouseOut }
}
