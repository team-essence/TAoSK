import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type Props = {
  className?: string
}

export const SearchTaskPopup: FC<Props> = ({ className }) => {
  return <StyledSearchTaskPopupContainer className={className}></StyledSearchTaskPopupContainer>
}

const StyledSearchTaskPopupContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(779)};
  height: ${calculateMinSizeBasedOnFigmaWidth(335)};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(6)};

  ${({ theme }) => css`
    box-shadow: ${calculateMinSizeBasedOnFigmaWidth(-6)} ${calculateMinSizeBasedOnFigmaWidth(8)}
      ${calculateMinSizeBasedOnFigmaWidth(3)} ${calculateMinSizeBasedOnFigmaWidth(-1)}${convertIntoRGBA(theme.COLORS.BLACK, 0.36)};
    background: ${theme.COLORS.BLACK_WHITE};
    border: solid 1px ${theme.COLORS.SILVER};
  `}
`
