import { useState, useLayoutEffect, RefObject, useMemo } from 'react'
import { useWatchElementAspect } from 'hooks/useWatchElementAspect'

type UseCalculateOverUsersReturn = {
  maxBoxes: number
  overUsersCount: number
  containerRef: RefObject<HTMLDivElement>
  avatarRef: RefObject<HTMLDivElement>
}

/**
 * コンテナの横幅に対して何個アバターを表示できるかを算出し、はみ出る分のアバター数と一行当たりのアバター数を返す
 * @param {number} userLength - ユーザー数
 * @return {UseCalculateOverUsersReturn} returns
 * @return {number} returns.maxBoxes - 一行に表示可能なアバター数
 * @return {number} returns.overUsersCount - はみ出てしまい、UserCountコンポーネントに表示することとなるアバター数
 * @return {RefObject<HTMLDivElement>} returns.containerRef - アバターのかたまりを包んでいるコンテナの参照
 * @return {RefObject<HTMLDivElement>} returns.avatarRef - 単一のアバターコンポーネントを包んでいるラッパー要素の参照
 */
export const useCalculateOverUsers = (userLength: number): UseCalculateOverUsersReturn => {
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
