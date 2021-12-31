import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import Status from 'utils/status/status'

type UseDisplayStatusReturn = {
  shouldDisplayNum: boolean
}

export const useDisplayStatus = (
  value: number,
  isTaskCompleted: boolean,
): UseDisplayStatusReturn => {
  const rank = useMemo(() => Status.toRank(value), [value])
  const [status, setStatus] = useState<number>(value)
  const [shouldDisplayNum, setShouldDisplayNum] = useState<boolean>(false)
  const isComponentMounted = useRef<boolean>(false)
  const preIsTaskCompleted = useRef<boolean>(isTaskCompleted)

  useEffect(() => {
    if (!isComponentMounted.current) {
      isComponentMounted.current = true
      return
    }

    const hasTaskCompleteAnimationDone = preIsTaskCompleted.current && !isTaskCompleted

    if (hasTaskCompleteAnimationDone) {
      setShouldDisplayNum(true)

      setTimeout(() => {
        setShouldDisplayNum(false)
      }, 3500)
    }

    preIsTaskCompleted.current = isTaskCompleted
  }, [value, isTaskCompleted])

  return { shouldDisplayNum }
}
