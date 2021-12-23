import { useEffect, useState } from 'react'
import {
  useGetGameLogsByProjectIdLazyQuery,
  useUpdateLogsByOnlineSubscription,
  useUpdateLogsByTaskSubScSubscription,
} from 'pages/projectDetail/projectDetail.gen'
import { useParams } from 'react-router-dom'
import { GameLogType } from 'types/gameLog'

export const useGameLog = () => {
  const { id: projectId } = useParams()
  const [gameLogs, setGameLogs] = useState<GameLogType[]>([])
  const [getGameLogsByProjectId] = useGetGameLogsByProjectIdLazyQuery({
    onCompleted(data) {
      data.findLogsByProjectId.map(gameLog => {
        const time = new Date(gameLog.created_at)

        const init: GameLogType = {
          context: gameLog.context,
          userName: gameLog.user.name,
          createdAt: time.getTime(),
        }
        setGameLogs(gameLog => [...gameLog, init])
      })
    },
  })

  const updateLogsByTask = useUpdateLogsByTaskSubScSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  const updateLogsByOnline = useUpdateLogsByOnlineSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  useEffect(() => {
    if (!updateLogsByTask.data) return
    setGameLogs([])

    updateLogsByTask.data.updateLogsByTask.map(gameLog => {
      const time = new Date(gameLog.created_at)

      const init: GameLogType = {
        context: gameLog.context,
        userName: gameLog.user.name,
        createdAt: time.getTime(),
      }
      setGameLogs(gameLog => [...gameLog, init])
    })
  }, [updateLogsByTask.data])

  useEffect(() => {
    if (!updateLogsByOnline.data) return
    setGameLogs([])

    updateLogsByOnline.data.updateLogsByOnline.map(gameLog => {
      const time = new Date(gameLog.created_at)

      const init: GameLogType = {
        context: gameLog.context,
        userName: gameLog.user.name,
        createdAt: time.getTime(),
      }
      setGameLogs(gameLog => [...gameLog, init])
    })
  }, [updateLogsByOnline.data])

  useEffect(() => {
    if (!projectId) return

    getGameLogsByProjectId({
      variables: {
        project_id: projectId,
      },
    })
  }, [projectId])

  return [gameLogs]
}
