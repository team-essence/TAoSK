import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { TaskStatusPointField } from 'components/models/task/TaskStatusPointField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { useTaskStatusPointEditForm } from 'hooks/useTaskStatusPointEditForm'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { STATUS_TYPE } from 'consts/status'
import { StatusParam } from 'types/status'

type Props = { id: string } & Record<StatusParam, number>

export const TaskEditStatusPointField: FCX<Props> = ({ className, id, ...initialStatusCounts }) => {
  const { statusCounts, setStatusCounts, disabled, onClickSaveButton } = useTaskStatusPointEditForm(
    {
      id,
      initialStatusCounts,
    },
  )

  return (
    <StyledWrapper className={className}>
      <StyledH3>獲得ステータスポイント</StyledH3>
      {Object.values(STATUS_TYPE).map((status, index) => (
        <TaskStatusPointField
          status={status}
          statusCounts={statusCounts}
          setStatusCounts={setStatusCounts}
          key={index}
        />
      ))}
      <StyledSaveButtonWrapper>
        <StyledSaveButton text="保存" onClick={onClickSaveButton} disabled={disabled} />
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
type Disabled = { disabled: boolean }
const StyledSaveButton = styled(CoarseButton).attrs<Disabled>(({ disabled }) => ({
  disabled,
}))<Disabled>`
  width: ${calculateMinSizeBasedOnFigma(64)};
  height: ${calculateMinSizeBasedOnFigma(32)};
  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        color: ${theme.COLORS.SILVER};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.ALTO, 0.55)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.NOBEL, 0.64)};
          }
        }
      `
    } else {
      return css`
        color: ${theme.COLORS.BRANDY};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)};
          }
        }
      `
    }
  }}
`
