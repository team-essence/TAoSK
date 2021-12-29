import React, { FCX, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Task } from 'types/task'
import { Params } from 'types/status'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { changeWeaponImage } from 'utils/changeWeaponImage'
import { changeDeadlineImage } from 'utils/changeDeadlineImage'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'
import { TaskEditModal } from 'components/models/task/TaskEditModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import date from 'utils/date/date'
import styled, { css } from 'styled-components'

type Props = {
  taskIndex: number
  listIndex: number
  listLength: number
  isCompletedProject: boolean
} & Omit<Task, 'vertical_sort'>

export const TaskCard: FCX<Props> = ({
  className,
  taskIndex,
  listIndex,
  listLength,
  isCompletedProject,
  ...taskInfo
}) => {
  const {
    id,
    title,
    technology,
    achievement,
    solution,
    motivation,
    design,
    plan,
    chatCount,
    allocations,
    end_date,
  } = taskInfo
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)
  const params: Params[] = [
    { param: 'plan', value: plan },
    { param: 'design', value: design },
    { param: 'motivation', value: motivation },
    { param: 'solution', value: solution },
    { param: 'achievement', value: achievement },
    { param: 'technology', value: technology },
  ]

  const max = params.reduce((prev, current) => (prev.value > current.value ? prev : current))

  const assignedUsers = allocations.map((item, index, array) =>
    index < 5 ? (
      <UserAvatarIcon key={index} avatarStyleType={AVATAR_STYLE.TASK} iconImage={item.icon_image} />
    ) : (
      index === array.length - 1 && (
        <UserCount key={index} userCount={array.length - 5} avatarStyleType={AVATAR_STYLE.TASK} />
      )
    ),
  )

  return (
    <>
      <Draggable
        key={id}
        draggableId={`task-${id}`}
        index={taskIndex}
        isDragDisabled={isCompletedProject}>
        {(taskProvided, snapshot) => (
          <StyledLi
            className={className}
            ref={taskProvided.innerRef}
            {...taskProvided.draggableProps}
            {...taskProvided.dragHandleProps}
            aria-roledescription="Press space bar to lift the task"
            onClick={() => setShouldShowModal(true)}>
            <StyledContainer>
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
                          <StyledDeadlineImage
                            src={changeDeadlineImage(end_date, listIndex, listLength)}
                            alt="deadline"
                            loading="lazy"
                            decoding="async"
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
                  <StyledWeaponImageContainer>
                    <StyledWeaponImage
                      src={changeWeaponImage(listIndex, listLength, max.param)}
                      alt="weapon"
                    />
                  </StyledWeaponImageContainer>
                </StyledFlexContainer>
              </StyledInnerWrap>
            </StyledContainer>
          </StyledLi>
        )}
      </Draggable>

      <TaskEditModal
        {...taskInfo}
        shouldShow={shouldShowModal}
        setShouldShow={setShouldShowModal}
        isCompletedProject={isCompletedProject}
      />
    </>
  )
}

const StyledLi = styled.li`
  cursor: pointer;
  position: relative;
  padding-bottom: ${calculateMinSizeBasedOnFigma(8)};
  user-select: none;
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
`
const StyledContainer = styled.div`
  height: auto;
  padding: ${calculateMinSizeBasedOnFigma(2)};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.LINEN};
  white-space: normal;
`
const StyledInnerWrap = styled.div`
  padding: ${calculateMinSizeBasedOnFigma(8)} ${calculateMinSizeBasedOnFigma(6)};
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
  margin-bottom: ${calculateMinSizeBasedOnFigma(8)};
`
const StyledWeaponImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigma(37)};
`
const StyledDeadlineImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigma(19)};
`
const StyledClockImage = styled.img`
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigma(10)};
  margin-top: ${calculateMinSizeBasedOnFigma(0.5)};
`
const StyledDate = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_10};
  color: ${({ theme }) => theme.COLORS.WHITE};
  letter-spacing: 0.2;
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
  width: ${calculateMinSizeBasedOnFigma(42)};
  height: ${calculateMinSizeBasedOnFigma(42)};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 4px;
  box-shadow: inset 1px -1px 5px rgba(0, 0, 0, 0.25);
`
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`
const StyledAvatarContainer = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigma(2)};
`
const StyledCommentContainer = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigma(2)};
  align-items: center;
`
const StyledFootContainer = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigma(4)};
  align-items: center;
  padding-top: ${calculateMinSizeBasedOnFigma(8)};
`
const StyledDateContainer = styled.div<{ listIndex: number; listLength: number }>`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigma(4)};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0 ${calculateMinSizeBasedOnFigma(4)};
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
