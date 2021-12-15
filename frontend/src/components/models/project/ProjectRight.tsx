import React, { FCX } from 'react'
import { useGameLog } from 'hooks/useGameLog'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { CreateListButton } from 'components/ui/button/CreateListButton'
import { LogContainer } from 'components/models/log/LogContainer'
import { Monster2DInformation } from 'components/models/monster/Monster2DInformation'

type Props = {
  onClick: () => void
  monsterName: string
  monsterHPRemaining: number
  monsterHp: number
  isTasks: boolean
}

export const ProjectRight: FCX<Props> = ({
  className,
  onClick,
  monsterName,
  monsterHPRemaining,
  monsterHp,
  isTasks,
}) => {
  const [gameLogs] = useGameLog()

  return (
    <StyledProjectRightContainer className={className}>
      <CreateListButton onClick={onClick} />
      <StyledProjectGameLog gameLogs={gameLogs} />
      <Monster2DInformation
        hpRemaining={monsterHPRemaining}
        name={monsterName}
        hp={monsterHp}
        isTasks={isTasks}
      />
    </StyledProjectRightContainer>
  )
}

const StyledProjectRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledProjectGameLog = styled(LogContainer)`
  margin-top: ${calculateMinSizeBasedOnFigmaHeight(16)};
  margin-bottom: ${calculateMinSizeBasedOnFigmaHeight(24)};
`
