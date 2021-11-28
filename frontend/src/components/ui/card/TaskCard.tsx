import React, { FC } from 'react'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { Task } from 'types/task'
import { changeWeapon } from 'utils/changeWeapon'
import styled from 'styled-components'

type Props = { listIndex: number; listLength: number } & Omit<Task, 'vertical_sort'>

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
}) => {
  const parameters = [
    { param: 'technology', value: technology },
    { param: 'achievement', value: achievement },
    { param: 'solution', value: solution },
    { param: 'motivation', value: motivation },
    { param: 'design', value: design },
    { param: 'plan', value: plan },
  ]
  const max = parameters.reduce((a, b) => (a.value > b.value ? a : b))

  return (
    <StyledContainer>
      <StyledInnerWrap>
        <StyledTitle>{title}</StyledTitle>
        <StyledWeaponImage src={changeWeapon(listIndex, listLength, max.param)} alt="weapon" />
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
