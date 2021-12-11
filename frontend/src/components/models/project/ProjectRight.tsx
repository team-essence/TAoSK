import React, { FCX, useState } from 'react'
import { useGameLog } from 'hooks/useGameLog'
import styled from 'styled-components'
import { GameLogType } from 'types/gameLog'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigmaWidth,
} from 'utils/calculateSizeBasedOnFigma'
import { CreateListButton } from 'components/ui/button/CreateListButton'
import { ProjectGameLog } from './ProjectGameLog'
import { ProjectMonster } from './ProjectMonster'

type Props = {
  onClick: () => void
  monsterName?: string
  monsterHPRemaining: number
  monsterHp?: number
}

export const ProjectRight: FCX<Props> = ({
  className,
  onClick,
  monsterName,
  monsterHPRemaining,
  monsterHp,
}) => {
  const [gameLogs] = useGameLog()

  return (
    <StyledProjectRightContainer className={className}>
      <CreateListButton onClick={onClick} />
      <StyledProjectGameLog gameLogs={gameLogs} />
      <ProjectMonster
        hpRemaining={monsterHPRemaining}
        name={monsterName as string}
        hp={monsterHp as number}
      />
    </StyledProjectRightContainer>
  )
}

const StyledProjectRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledProjectGameLog = styled(ProjectGameLog)`
  margin-top: ${calculateMinSizeBasedOnFigmaHeight(16)};
  margin-bottom: ${calculateMinSizeBasedOnFigmaHeight(24)};
`
