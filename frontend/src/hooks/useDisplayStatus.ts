import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { TRANSITION_DURATION_MS } from 'styles/animation/projectMyStatusTransition'
import Status from 'utils/status/status'
import { Rank, ranks } from 'consts/status'

type UseDisplayStatusReturn = {
  rank: Rank
  statusNumToDisplay: number
  shouldDisplayNum: boolean
}

type ControlStatusNumType = 'up' | 'down'

export const useDisplayStatus = (
  currentStatusNum: number,
  isTaskCompleted: boolean,
): UseDisplayStatusReturn => {
  const currentRank = useMemo(() => Status.toRank(currentStatusNum), [currentStatusNum])
  const remainderStatus = useMemo(
    () => Status.toRemainderStatus(currentStatusNum),
    [currentStatusNum],
  )

  const [rank, setRank] = useState<Rank>(currentRank)
  const [statusNumToDisplay, setStatusNumToDisplay] = useState<number>(remainderStatus)
  const [shouldDisplayNum, setShouldDisplayNum] = useState<boolean>(false)
  const isComponentMounted = useRef<boolean>(false)
  const preIsTaskCompleted = useRef<boolean>(isTaskCompleted)
  const preStatusNum = useRef<number>(currentStatusNum)
  const preRank = useRef<Rank>(currentRank)

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
    [remainderStatus, currentRank],
  )

  useEffect(() => {
    const controlStatusNumToDisplay = (type: ControlStatusNumType) => {
      const MARGIN_TIME = 100
      const MS = TRANSITION_DURATION_MS + MARGIN_TIME
      setShouldDisplayNum(true)
      setTimeout(() => flashStatusNumFast(type), MS)
      setTimeout(() => {
        setShouldDisplayNum(false)
        setRank(Status.toRank(currentStatusNum))
      }, 3300)
    }
    if (!isComponentMounted.current) {
      isComponentMounted.current = true
      return
    }

    const hasStatusNumDecreased =
      ranks.indexOf(currentRank) >= ranks.indexOf(preRank.current) &&
      currentStatusNum < preStatusNum.current
    const hasTaskCompleteAnimationDone = preIsTaskCompleted.current && !isTaskCompleted

    if (hasStatusNumDecreased) {
      controlStatusNumToDisplay('down')
    } else if (hasTaskCompleteAnimationDone) {
      controlStatusNumToDisplay('up')
    }

    preIsTaskCompleted.current = isTaskCompleted
    preStatusNum.current = currentStatusNum
    preRank.current = currentRank
  }, [currentStatusNum, isTaskCompleted])

  return { rank, statusNumToDisplay, shouldDisplayNum }
}
