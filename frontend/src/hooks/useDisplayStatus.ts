import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { TRANSITION_DURATION_MS } from 'styles/animation/projectMyStatusTransition'
import Status from 'utils/status/status'

type UseDisplayStatusReturn = {
  rank: ReturnType<typeof Status.toRank>
  statusNumToDisplay: number
  shouldDisplayNum: boolean
}

type ControlStatusNumType = 'up' | 'down'

export const useDisplayStatus = (
  currentStatusNum: number,
  isTaskCompleted: boolean,
): UseDisplayStatusReturn => {
  const rank = useMemo(() => Status.toRank(currentStatusNum), [currentStatusNum])
  const remainderStatus = useMemo(
    () => Status.toRemainderStatus(currentStatusNum),
    [currentStatusNum],
  )

  const [statusNumToDisplay, setStatusNumToDisplay] = useState<number>(remainderStatus)
  const [shouldDisplayNum, setShouldDisplayNum] = useState<boolean>(false)
  const isComponentMounted = useRef<boolean>(false)
  const preIsTaskCompleted = useRef<boolean>(isTaskCompleted)
  const preRemainderStatus = useRef<number>(remainderStatus)

  const flashStatusNumFast = useCallback(
    (type: ControlStatusNumType) => {
      let current: number = statusNumToDisplay
      const timer = setInterval(() => {
        if (current === remainderStatus) {
          clearInterval(timer)
        } else {
          setStatusNumToDisplay(pre => Status.toRemainderStatus(type === 'up' ? ++pre : --pre))
          current = Status.toRemainderStatus(type === 'up' ? ++current : --current)
        }
      }, 100)
    },
    [remainderStatus],
  )

  useEffect(() => {
    const controlStatusNumToDisplay = (type: ControlStatusNumType) => {
      const MARGIN_TIME = 100
      const MS = TRANSITION_DURATION_MS + MARGIN_TIME
      setShouldDisplayNum(true)
      setTimeout(() => flashStatusNumFast(type), MS)
      setTimeout(() => setShouldDisplayNum(false), 3300)
    }
    if (!isComponentMounted.current) {
      isComponentMounted.current = true
      return
    }

    const hasStatusNumDecreased = remainderStatus < preRemainderStatus.current
    const hasTaskCompleteAnimationDone = preIsTaskCompleted.current && !isTaskCompleted

    if (hasStatusNumDecreased) controlStatusNumToDisplay('down')
    if (hasTaskCompleteAnimationDone) controlStatusNumToDisplay('up')

    preIsTaskCompleted.current = isTaskCompleted
    preRemainderStatus.current = remainderStatus
  }, [remainderStatus, isTaskCompleted])

  return { rank, statusNumToDisplay, shouldDisplayNum }
}
