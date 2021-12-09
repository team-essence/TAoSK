import React, { FC } from 'react'
import styled from 'styled-components'
import { GameLogType } from 'types/gameLog'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigmaWidth,
} from 'utils/calculateSizeBasedOnFigma'
import { CreateListButton } from '../../ui/button/CreateListButton'
import { ProjectGameLog } from './ProjectGameLog'
import { ProjectMonster } from './ProjectMonster'

type Props = {
  className?: string
  onClick: () => void
  monsterName: string
  monsterHPRemaining: number
  monsterHp: number
  gameLogs: GameLogType[]
}

export const ProjectRight: FC<Props> = ({
  className,
  onClick,
  monsterName,
  monsterHPRemaining,
  monsterHp,
  gameLogs,
}) => {
  return (
    <StyledProjectRightContainer className={className}>
      <CreateListButton onClick={onClick} />
      <StyledProjectGameLog gameLogs={gameLogs} />
      <ProjectMonster hpRemaining={monsterHPRemaining} name={monsterName} hp={monsterHp} />
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
