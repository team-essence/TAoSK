import { useEffect, useState } from 'react'
import { useGetGameLogsByProjectIdLazyQuery } from 'pages/projectDetail/projectDetail.gen'
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
