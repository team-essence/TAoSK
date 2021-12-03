import React, { FC } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  param: string
  value: number
}

export const EmployeeStatus: FC<Props> = ({ param, value }) => {
  return (
    <StyledContainer param={param}>
      <div>{value}</div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div<{ param: string }>`
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
