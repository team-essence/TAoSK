import React, { FC } from 'react'
import { StatusParam } from 'types/status'
import { convertParamIntoJp } from 'utils/convertParamIntoJp'
import Status from 'utils/status/status'
import styled, { css } from 'styled-components'

type Props = {
  param: StatusParam
  value: number
}

export const EmployeeStatus: FC<Props> = ({ param, value }) => {
  const rank = Status.toRank(value)
  const proficiency = Status.toRemainderStatus(value)

  return (
    <StyledContainer param={param}>
      <StyledFlexContainer>
        <img src="/svg/weapon/technology_bg.svg" alt="weapon" />
        <p>{convertParamIntoJp(param)}</p>
      </StyledFlexContainer>
      <div>
        <p>{rank}</p>
        <p>{proficiency}</p>
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div<{ param: string }>`
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  ${({ param, theme }) => {
    switch (param) {
      case 'technology':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.TECHNOLOGY};
        `
      case 'achievement':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.ACHIEVEMENT};
        `
      case 'solution':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.SOLUTION};
        `
      case 'motivation':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.MOTIVATION};
        `
      case 'design':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.DESIGN};
        `
      case 'plan':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.PLAN};
        `
      default:
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.MINE_SHAFT};
        `
    }
  }}
`
const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
`
// const StyledParam = styled(StyledFlex)``
