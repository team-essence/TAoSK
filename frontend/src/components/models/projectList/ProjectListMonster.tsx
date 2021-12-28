import React, { FCX } from 'react'
import Rating from '@mui/material/Rating'
import styled, { css } from 'styled-components'
import { MonsterAvatar } from 'components/models/monster/MonsterAvatar'
import { ShinyStarIcon } from 'components/ui/icon/ShinyStarIcon'
import { EmptyShinyStarIcon } from 'components/ui/icon/EmptyShinyStarIcon'
import {
  calculateVwBasedOnFigma,
  calculateMinSizeBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import date from 'utils/date/date'
import { EggAvatar } from '../egg/EggAvatar'

type Props = {
  specie?: string
  difficulty?: number
  limitDeadline: string
  hasTasks: boolean
}

export const ProjectListMonster: FCX<Props> = ({
  specie,
  difficulty,
  limitDeadline,
  className,
  hasTasks,
}) => {
  return (
    <StyledMonsterContainer className={className}>
      {hasTasks ? <StyledMonsterAvatar /> : <StyledEggAvatar />}

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
  position: relative;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
`

const StyledMonsterAvatar = styled(MonsterAvatar)`
  flex-grow: 1;
`

const StyledEggAvatar = styled(EggAvatar)`
  flex-grow: 1;
`

const StyledMonsterStatusContainer = styled.div`
  width: 100%;
  ${({ theme }) =>
    css`
      border-top: solid 1px ${theme.COLORS.SILVER};
      border-bottom: solid 1px ${theme.COLORS.SILVER};
    `}
`

const StyledMonsterStatus = styled.div`
  ${({ theme }) =>
    css`
      padding: ${calculateVwBasedOnFigma(6)} 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: ${theme.FONT_SIZES.SIZE_16};

      &:nth-child(2) {
        border-top: solid 1px ${theme.COLORS.SILVER};
        border-bottom: solid 1px ${theme.COLORS.SILVER};
      }
    `}
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
