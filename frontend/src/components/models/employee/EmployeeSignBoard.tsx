import React, { FC } from 'react'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
  className?: string
  isOpen: boolean
  handleClick: () => void
}

export const EmployeeSignBoard: FC<Props> = ({ className, isOpen, handleClick }) => {
  return (
    <StyledContainer className={className} onClick={handleClick}>
      <StyledH3>MEMBER</StyledH3>
      <StyledFontAwesomeIcon icon={isOpen ? faCaretLeft : faCaretRight} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  padding: ${calculateMinSizeBasedOnFigmaWidth(4)} ${calculateMinSizeBasedOnFigmaWidth(2)};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  filter: drop-shadow(-4px 4px 2px rgba(0, 0, 0, 0.5));
  cursor: pointer;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  text-orientation: upright;
`
const StyledH3 = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
