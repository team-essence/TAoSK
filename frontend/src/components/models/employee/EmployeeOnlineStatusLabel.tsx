import React, { FC } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
  label: string
  status: boolean
}

export const EmployeeOnlineStatusLabel: FC<Props> = ({ label, status }) => {
  return (
    <StyledContainer>
      <StyledCircle status={status} />
      <StyledLabel>{label}</StyledLabel>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigmaWidth(4)};
  width: ${calculateMinSizeBasedOnFigmaWidth(88)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.MATTERHORN};
`
const StyledCircle = styled.div<{ status: boolean }>`
  width: ${calculateMinSizeBasedOnFigmaWidth(8)};
  height: ${calculateMinSizeBasedOnFigmaWidth(8)};
  border-radius: 50%;
  ${({ status }) =>
    status
      ? css`
          background-color: ${({ theme }) => theme.COLORS.HP};
        `
      : css`
          background-color: ${({ theme }) => theme.COLORS.SILVER};
        `}
`
const StyledLabel = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
