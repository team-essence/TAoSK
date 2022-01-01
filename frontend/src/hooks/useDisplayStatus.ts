import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import {
  TRANSITION_DURATION_MS,
  RANK_UP_DURATION_MS,
} from 'styles/animation/projectMyStatusAnimation'
import Status from 'utils/status/status'
import { Rank, ranks } from 'consts/status'

type UseDisplayStatusReturn = {
  rank: Rank
  statusNumToDisplay: number
  shouldDisplayNum: boolean
  shouldDisplayRankUp: boolean
}

type ControlStatusNumType = 'up' | 'down'

/** 表示するステータスのランク・経験値を制御する */
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
  const [shouldDisplayRankUp, setShouldDisplayRankUp] = useState<boolean>(false)
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
          return
        }

        const newStatusNum = type === 'up' ? current + 1 : current - 1
        setStatusNumToDisplay(pre => Status.toRemainderStatus(type === 'up' ? ++pre : --pre))
        current = Status.toRemainderStatus(newStatusNum)

        const shouldChangeRank =
          (type === 'up' && current === 0) || (type === 'down' && current === 99)

        if (shouldChangeRank) setRank(currentRank)
        if (shouldChangeRank && type === 'up') {
          setShouldDisplayRankUp(true)
          setTimeout(() => setShouldDisplayRankUp(false), RANK_UP_DURATION_MS)
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
      setTimeout(() => setShouldDisplayNum(false), 3300)
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

  return { rank, statusNumToDisplay, shouldDisplayNum, shouldDisplayRankUp }
}
