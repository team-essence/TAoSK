import { useState, useLayoutEffect, RefObject, useMemo } from 'react'
import { useWatchElementAspect } from 'hooks/useWatchElementAspect'

type UseCalculateOverUsers = {
  maxBoxes: number
  overUsersCount: number
  containerRef: RefObject<HTMLDivElement>
  avatarRef: RefObject<HTMLDivElement>
}

export const useCalculateOverUsers = (userLength: number): UseCalculateOverUsers => {
  const { sizeInspectedEl: containerRef, width: containerWidth } =
    useWatchElementAspect<HTMLDivElement>()
  const { sizeInspectedEl: avatarRef, width: avatarWidth } = useWatchElementAspect<HTMLDivElement>()
  const [maxBoxes, setMaxBoxes] = useState<number>(0)
  const overUsersCount: number = useMemo(() => userLength - (maxBoxes - 1), [userLength, maxBoxes])
  const AVATAR_ELEMENT_GAP_PX = 6

  useLayoutEffect(() => {
    setMaxBoxes(
      Math.trunc((containerWidth + AVATAR_ELEMENT_GAP_PX) / (avatarWidth + AVATAR_ELEMENT_GAP_PX)),
    )
  }, [containerWidth, avatarWidth, userLength])

  return { maxBoxes, overUsersCount, containerRef, avatarRef }
}
