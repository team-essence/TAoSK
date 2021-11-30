import React, { FC } from 'react'
import { Task } from 'types/task'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { changeWeaponImage } from 'utils/changeWeaponImage'
import { changeDeadlineImage } from 'utils/changeDeadlineImage'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { Draggable } from 'react-beautiful-dnd'
import date from 'utils/date/date'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
  taskIndex: number
  listIndex: number
  listLength: number
} & Omit<Task, 'vertical_sort'>

export const TaskCard: FC<Props> = ({
  id,
  title,
  technology,
  achievement,
  solution,
  motivation,
  design,
  plan,
  taskIndex,
  listIndex,
  listLength,
  chatCount,
  allocations,
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
  const assignedUsers = allocations.map((item, index, array) =>
    index < 6 ? (
      <UserAvatarIcon iconType="Task and modal" iconImage={item.icon_image} size={24} />
    ) : (
      index === array.length - 1 && <UserCount userCount={array.length - 6} styleType="task" />
    ),
  )

  return (
    <Draggable draggableId={`task-${id}`} index={taskIndex}>
      {(taskProvided, snapshot) => (
        <div
          ref={taskProvided.innerRef}
          {...taskProvided.draggableProps}
          {...taskProvided.dragHandleProps}>
          <StyledContainer isDragging={snapshot.isDragging}>
            <StyledInnerWrap>
              <StyledTitle>{title}</StyledTitle>
              <StyledFlexContainer>
                <div>
                  {allocations.length !== 0 && (
                    <StyledAvatarContainer>{assignedUsers}</StyledAvatarContainer>
                  )}
                  <StyledFootContainer>
                    {end_date && (
                      <>
                        <StyledDeadlineImage src={changeDeadlineImage(end_date)} alt="deadline" />
                        <StyledDateContainer listIndex={listIndex} listLength={listLength}>
                          <StyledClockImage src="/svg/clock.svg" alt="clock" />
                          <StyledDate>{date.formatDate(end_date)}</StyledDate>
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
                <StyledWeaponImageContainer>
                  <StyledWeaponImage
                    src={changeWeaponImage(listIndex, listLength, max.param)}
                    alt="weapon"
                  />
                </StyledWeaponImageContainer>
              </StyledFlexContainer>
            </StyledInnerWrap>
          </StyledContainer>
        </div>
      )}
    </Draggable>
  )
}

const StyledContainer = styled.div<{ isDragging: boolean }>`
  height: auto;
  padding: ${calculateVwBasedOnFigma(2)};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.LINEN};
  white-space: normal;
  transform: rotate(45deg);
  transform-origin: 0 0;
  ${({ isDragging }) =>
    isDragging
      ? css`
          transform: rotate(3deg);
          transform-origin: 0 0;
        `
      : css`
          transform: rotate(0);
          transform-origin: 0 0;
        `}
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
  margin-bottom: ${calculateVwBasedOnFigma(8)};
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
const StyledAvatarContainer = styled.div`
  display: flex;
  gap: ${calculateVwBasedOnFigma(2)};
`
const StyledCommentContainer = styled.div`
  display: flex;
  gap: ${calculateVwBasedOnFigma(4)};
  align-items: center;
`
const StyledFootContainer = styled.div`
  display: flex;
  gap: ${calculateVwBasedOnFigma(4)};
  align-items: center;
  padding-top: ${calculateVwBasedOnFigma(8)};
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
