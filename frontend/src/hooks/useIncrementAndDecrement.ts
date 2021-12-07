import { useState, useCallback, useLayoutEffect } from 'react'

type UseIncrementAndDecrementReturn = {
  count: number
  increment: () => void
  decrement: () => void
  isDisabledIncrement: boolean
  isDisabledDecrement: boolean
}

/**
 * 獲得ステータスポイントを増減するのに使う
 */
export const useIncrementAndDecrement = (
  max: number,
  min: number,
): UseIncrementAndDecrementReturn => {
  const [count, setCount] = useState<number>(0)
  const [isDisabledIncrement, setIsDisabledIncrement] = useState<boolean>(false)
  const [isDisabledDecrement, setIsDisabledDecrement] = useState<boolean>(false)

  const increment = useCallback(() => {
    if (!isDisabledIncrement) setCount(prev => prev + 1)
  }, [])
  const decrement = useCallback(() => {
    if (!isDisabledDecrement) setCount(prev => prev - 1)
  }, [])

  useLayoutEffect(() => {
    if (count >= max) {
      setIsDisabledIncrement(true)
    } else if (count <= min) {
      setIsDisabledDecrement(true)
    } else {
      setIsDisabledIncrement(false)
      setIsDisabledDecrement(false)
    }
  }, [count])

  return { count, increment, decrement, isDisabledIncrement, isDisabledDecrement }
}
