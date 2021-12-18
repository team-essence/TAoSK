import React, { FCX } from 'react'
import { Task } from 'types/task'
import { Params } from 'types/status'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { changeDeadlineImage } from 'utils/changeDeadlineImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import date from 'utils/date/date'
import styled, { css } from 'styled-components'

type Props = {
  listIndex: number
  listLength: number
  openModal: () => void
} & Omit<Task, 'vertical_sort' | 'id' | 'allocations'>

export const TaskCardPopup: FCX<Props> = ({
  openModal,
  title,
  technology,
  achievement,
  solution,
  motivation,
  design,
  plan,
  listIndex,
  listLength,
  chatCount,
  end_date,
}) => {
  const params: Params[] = [
    { param: 'technology', value: technology },
    { param: 'achievement', value: achievement },
    { param: 'solution', value: solution },
    { param: 'motivation', value: motivation },
    { param: 'design', value: design },
    { param: 'plan', value: plan },
  ]

  return (
    <StyledContainer onClick={openModal}>
      <StyledInnerWrap>
        <StyledTitle>{title}</StyledTitle>
        <StyledFlexContainer>
          <div>
            <StyledFootContainer>
              {end_date && (
                <>
                  <StyledDeadlineImage
                    src={changeDeadlineImage(end_date, listIndex, listLength)}
                    alt="deadline"
                  />
                  <StyledDateContainer listIndex={listIndex} listLength={listLength}>
                    <StyledClockImage src="/svg/clock.svg" alt="clock" />
                    <StyledDate>{date.formatDay(end_date)}</StyledDate>
                  </StyledDateContainer>
                </>
              )}
              {chatCount !== 0 && (
                <StyledCommentContainer>
                  <StyledFontAwesomeIcon icon={faComment} />
                  <StyledChatCount>{chatCount}</StyledChatCount>
                </StyledCommentContainer>
              )}
            </StyledFootContainer>
          </div>
        </StyledFlexContainer>
      </StyledInnerWrap>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  cursor: pointer;
  height: auto;
  padding: ${calculateMinSizeBasedOnFigmaWidth(2)};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.LINEN};
  white-space: normal;
`
const StyledInnerWrap = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(6)};
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
const StyledDeadlineImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigmaWidth(19)};
`
const StyledClockImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigmaWidth(10)};
  margin-top: ${calculateMinSizeBasedOnFigmaWidth(0.5)};
`
const StyledDate = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_10};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  color: ${({ theme }) => theme.COLORS.GRAY};
`
const StyledChatCount = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  color: ${({ theme }) => theme.COLORS.GRAY};
`
const StyledWeaponImageContainer = styled.div`
  display: grid;
  place-items: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(42)};
  height: ${calculateMinSizeBasedOnFigmaWidth(42)};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 4px;
  box-shadow: inset 1px -1px 5px rgba(0, 0, 0, 0.25);
`
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const StyledCommentContainer = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(4)};
  align-items: center;
`
const StyledFootContainer = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(4)};
  align-items: center;
  padding-top: ${calculateMinSizeBasedOnFigmaWidth(8)};
`
const StyledDateContainer = styled.div<{ listIndex: number; listLength: number }>`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(4)};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
  ${({ listIndex, listLength }) =>
    listIndex === 0
      ? css`
          background-color: ${({ theme }) => theme.COLORS.CITRON};
        `
      : listIndex < listLength && listIndex !== listLength - 1
      ? css`
          background-color: ${({ theme }) => theme.COLORS.SHIP_COVE};
        `
      : css`
          background-color: ${({ theme }) => theme.COLORS.BOULDER};
        `}
`
