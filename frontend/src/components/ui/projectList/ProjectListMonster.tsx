import React, { FC } from 'react'
import { RatingView } from 'react-simple-star-rating'
import styled from 'styled-components'
import { MonsterAvatar } from 'components/models/monster/MonsterAvatar'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateMinSizeBasedOnFigmaWidth'
import date from 'utils/date/date'

type Props = {
  specie: string
  difficulty: number
  limitDeadline: string
}

export const ProjectListMonster: FC<Props> = ({ specie, difficulty, limitDeadline }) => {
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
          <RatingContainer>
            <RatingView ratingValue={difficulty}>
              <img src="/svg/star.svg" alt="スター" />
            </RatingView>
          </RatingContainer>
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

const RatingContainer = styled.div`
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
