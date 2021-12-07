import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  className?: string
  handlers:
    | boolean
    | {
        onMouseOver(): void
        onMouseOut(): void
      }
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const InvitationHeader: FC<Props> = ({ className, handlers, onClick }) => {
  return (
    <StyledInvitationHeaderContainer className={className} {...handlers} onClick={onClick}>
      <p>招待</p>
    </StyledInvitationHeaderContainer>
  )
}

const StyledInvitationHeaderContainer = styled.div`
  margin-right: ${calculateMinSizeBasedOnFigmaWidth(26)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(3)} ${calculateMinSizeBasedOnFigmaWidth(0)};
  width: ${calculateMinSizeBasedOnFigmaWidth(64)};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
  text-align: center;
  cursor: pointer;

  ${({ theme }) => css`
    background: ${theme.COLORS.DODGER_BLUE};
    font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    font-size: ${theme.FONT_SIZES.SIZE_12};
    line-height: ${theme.FONT_SIZES.SIZE_16};
    color: ${theme.COLORS.WHITE};
  `}
`
