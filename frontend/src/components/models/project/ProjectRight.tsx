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
      <StyledMonster2DInformation
        hpRemaining={monsterHPRemaining}
        name={monsterName}
        hp={monsterHp}
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

const StyledProjectGameLog = styled(LogContainer)`
  margin-top: ${calculateMinSizeBasedOnFigmaHeight(16)};
`

const StyledMonster2DInformation = styled(Monster2DInformation)`
  position: fixed;
  bottom: ${calculateMinSizeBasedOnFigma(20)};
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_6};
`
