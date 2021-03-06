import React, { FCX } from 'react'
import { useGameLog } from 'hooks/useGameLog'
import styled from 'styled-components'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import { CreateListButton } from 'components/ui/button/CreateListButton'
import { LogContainer } from 'components/models/log/LogContainer'
import { Monster2DInformation } from 'components/models/monster/Monster2DInformation'

type Props = {
  onClick: () => void
  monsterName: string
  monsterHPRemaining: number
  monsterHp: number
  isTasks: boolean
  isCompletedProject: boolean
}

export const ProjectRight: FCX<Props> = ({
  className,
  onClick,
  monsterName,
  monsterHPRemaining,
  monsterHp,
  isTasks,
  isCompletedProject,
}) => {
  const [gameLogs] = useGameLog()

  return (
    <StyledProjectRightContainer className={className}>
      <StyledCreateListButton onClick={onClick} disabled={isCompletedProject} />

      <StyledProjectGameLog gameLogs={gameLogs} />

      <StyledMonster2DInformation
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
  position: relative;
`

const StyledCreateListButton = styled(CreateListButton)`
  margin-bottom: ${calculateMinSizeBasedOnFigmaHeight(23)};
`

const StyledProjectGameLog = styled(LogContainer)``

const StyledMonster2DInformation = styled(Monster2DInformation)`
  position: fixed;
  bottom: ${calculateMinSizeBasedOnFigma(20)};
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_6};
`
