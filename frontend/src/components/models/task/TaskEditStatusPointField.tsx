import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { TaskStatusPointField } from 'components/models/task/TaskStatusPointField'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { useTaskStatusPointEditForm } from 'hooks/useTaskStatusPointEditForm'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { STATUS_TYPE } from 'consts/status'
import { StatusParam } from 'types/status'

type Props = { id: string; completedFlag: boolean } & Record<StatusParam, number>

export const TaskEditStatusPointField: FCX<Props> = ({
  className,
  id,
  completedFlag,
  ...initialStatusCounts
}) => {
  const { setStatusCounts, disabled, onClickSaveButton } = useTaskStatusPointEditForm({
    id,
    initialStatusCounts,
  })

  return (
    <StyledWrapper className={className}>
      <StyledH3>獲得ステータスポイント</StyledH3>
      {Object.values(STATUS_TYPE).map((status, index) => (
        <TaskStatusPointField
          status={status}
          statusCounts={initialStatusCounts}
          setStatusCounts={setStatusCounts}
          completedFlag={completedFlag}
          key={index}
        />
      ))}
      <StyledSaveButtonWrapper>
        <CoarseRedOxideButton text="保存" onClick={onClickSaveButton} disabled={disabled} />
      </StyledSaveButtonWrapper>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${calculateMinSizeBasedOnFigma(8)};
`
const StyledH3 = styled.h3`
  ${({ theme }) => css`
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-size: ${theme.FONT_SIZES.SIZE_16};
    font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
  `}
`
const StyledSaveButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`
