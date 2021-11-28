import React, { FC } from 'react'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { Task } from 'types/task'
import { useChangeDeadlineImage } from 'hooks/useChangeDeadlineImage'
import { changeWeapon } from 'utils/changeWeapon'
import styled from 'styled-components'

type Props = {
  listIndex: number
  listLength: number
} & Omit<Task, 'vertical_sort'>

export const TaskCard: FC<Props> = ({
  title,
  technology,
  achievement,
  solution,
  motivation,
  design,
  plan,
  listIndex,
  listLength,
  end_date,
}) => {
  const deadlineImage = useChangeDeadlineImage(end_date)

  const params = [
    { param: 'technology', value: technology },
    { param: 'achievement', value: achievement },
    { param: 'solution', value: solution },
    { param: 'motivation', value: motivation },
    { param: 'design', value: design },
    { param: 'plan', value: plan },
  ]
  const max = params.reduce((a, b) => (a.value > b.value ? a : b))

  return (
    <StyledContainer>
      <StyledInnerWrap>
        <StyledTitle>{title}</StyledTitle>
        <StyledFlexContainer>
          <div>
            <img src={deadlineImage} alt="warning" width="14" />
          </div>
          <StyledWeaponImage src={changeWeapon(listIndex, listLength, max.param)} alt="weapon" />
        </StyledFlexContainer>
      </StyledInnerWrap>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  height: auto;
  padding: ${calculateVwBasedOnFigma(2)};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.LINEN};
  white-space: normal;
`
const StyledInnerWrap = styled.div`
  padding: ${calculateVwBasedOnFigma(8)} ${calculateVwBasedOnFigma(6)};
  border: 2px solid ${({ theme }) => theme.COLORS.CARARRA};
  border-radius: 4px;
`

const StyledTitle = styled.h3`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  color: ${({ theme }) => theme.COLORS.SHIP_GRAY};
`

const StyledWeaponImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateVwBasedOnFigma(37)};
`

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
