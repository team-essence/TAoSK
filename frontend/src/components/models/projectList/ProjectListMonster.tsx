import React, { FCX } from 'react'
import Rating from '@mui/material/Rating'
import styled from 'styled-components'
import { MonsterAvatar } from 'components/models/monster/MonsterAvatar'
import { ShinyStarIcon } from 'components/ui/icon/ShinyStarIcon'
import { EmptyShinyStarIcon } from 'components/ui/icon/EmptyShinyStarIcon'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import date from 'utils/date/date'

type Props = {
  specie?: string
  difficulty?: number
  limitDeadline: string
}

export const ProjectListMonster: FCX<Props> = ({ specie, difficulty, limitDeadline }) => {
  return (
    <StyledMonsterContainer>
      <MonsterAvatar />

      <StyledMonsterStatusContainer>
        <StyledMonsterStatus>
          <h4>種族</h4>
          <p>{specie}</p>
        </StyledMonsterStatus>
        <StyledMonsterStatus>
          <h4>危険度</h4>

          <StyledRating
            max={10}
            value={difficulty ?? 1}
            icon={<StyledShinyStarIcon />}
            emptyIcon={<StyledEmptyShinyStarIcon />}
            readOnly
          />
        </StyledMonsterStatus>
        <StyledMonsterStatus>
          <h4>制限期日</h4>
          <p>{date.formatDay(limitDeadline)}</p>
        </StyledMonsterStatus>
      </StyledMonsterStatusContainer>
    </StyledMonsterContainer>
  )
}

const StyledMonsterContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`

const StyledMonsterStatusContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaHeight(346)};
  border-top: solid 1px ${({ theme }) => theme.COLORS.SILVER};
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER};
`

const StyledMonsterStatus = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaHeight(6)} 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${calculateMinSizeBasedOnFigmaHeight(16)};

  &:nth-child(2) {
    border-top: solid 1px ${({ theme }) => theme.COLORS.SILVER};
    border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER};
  }
`
const StyledRating = styled(Rating)`
  width: ${calculateMinSizeBasedOnFigma(251)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledShinyStarIcon = styled(ShinyStarIcon)`
  width: ${calculateMinSizeBasedOnFigma(20)};
  height: ${calculateMinSizeBasedOnFigma(20)};
`
const StyledEmptyShinyStarIcon = StyledShinyStarIcon.withComponent(EmptyShinyStarIcon)
