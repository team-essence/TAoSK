import React, { FC } from 'react'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { Task } from 'types/task'
import { changeWeaponImage } from 'utils/changeWeaponImage'
import { changeDeadlineImage } from 'utils/changeDeadlineImage'
import date from 'utils/date/date'
import styled, { css } from 'styled-components'

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
  end_date,
}) => {
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
          <StyledFootContainer>
            <StyledDeadlineImage src={changeDeadlineImage(end_date)} alt="deadline" />
            <StyledDateContainer listIndex={listIndex} listLength={listLength}>
              <StyledClockImage src="/svg/clock.svg" alt="clock" />
              <StyledDate>{date.formatDate(end_date)}</StyledDate>
            </StyledDateContainer>
          </StyledFootContainer>
          <StyledWeaponImageContainer>
            <StyledWeaponImage
              src={changeWeaponImage(listIndex, listLength, max.param)}
              alt="weapon"
            />
          </StyledWeaponImageContainer>
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
const StyledDeadlineImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateVwBasedOnFigma(14)};
`
const StyledClockImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateVwBasedOnFigma(10)};
  margin-top: ${calculateVwBasedOnFigma(0.5)};
`
const StyledDate = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_10};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledWeaponImageContainer = styled.div`
  display: grid;
  place-items: center;
  width: ${calculateVwBasedOnFigma(42)};
  height: ${calculateVwBasedOnFigma(42)};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 4px;
  box-shadow: inset 1px -1px 5px rgba(0, 0, 0, 0.25);
`
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const StyledDateContainer = styled.div<{ listIndex: number; listLength: number }>`
  display: flex;
  gap: ${calculateVwBasedOnFigma(4)};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0 ${calculateVwBasedOnFigma(4)};
  ${({ listIndex, listLength }) =>
    listIndex === 0
      ? css`
          background-color: ${({ theme }) => theme.COLORS.OLIVE_GREEN};
        `
      : listIndex < listLength && listIndex !== listLength - 1
      ? css`
          background-color: ${({ theme }) => theme.COLORS.SHIP_COVE};
        `
      : css`
          background-color: ${({ theme }) => theme.COLORS.BOULDER};
        `}
`
const StyledFootContainer = styled.div`
  display: flex;
  gap: ${calculateVwBasedOnFigma(4)};
  align-items: center;
`
