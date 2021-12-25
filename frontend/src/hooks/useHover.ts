import { useMemo, useState } from 'react'

type UseHoverReturn = [boolean, { onMouseOver: () => void; onMouseOut: () => void }]

export const useHover = (): UseHoverReturn => {
  const [hovered, setHovered] = useState(false)

  const eventHoverHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true)
      },
      onMouseOut() {
        setHovered(false)
      },
    }),
    [],
  )

  return [hovered, eventHoverHandlers]
}
