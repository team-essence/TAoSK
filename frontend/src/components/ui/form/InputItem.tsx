import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { CrossButton } from 'components/ui/button/CrossButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'
import { generateStyleBasedOnFigma } from 'utils/calculateVwBasedOnFigma'

type Props = {
  className?: string
  itemName: string
  onClick?: (e: MouseEvent) => void
}

export const InputItem: FC<Props> = ({ className, itemName, onClick }) => {
  return (
    <StyledOuterWrapper className={className}>
      <StyledOuterMask>
        <StyledTextWrapper>
          <StyledText>{itemName}</StyledText>
          <StyledCrossButton color={theme.COLORS.CHOCOLATE} onClick={onClick} />
        </StyledTextWrapper>
        <StyledInnerBackground />
      </StyledOuterMask>
    </StyledOuterWrapper>
  )
}

const StyledOuterWrapper = styled.div`
  display: inline-block;
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  background-image: url('grain.png');
  color: ${({ color }) => color};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
  ${({ theme }) => generateStyleBasedOnFigma`
    font-size: ${theme.FONT_SIZES.SIZE_14};
  `}
`
const StyledOuterMask = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.BRIDAL_HEATH, 0.42)};
`
const StyledTextWrapper = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledText = styled.span`
  ${generateStyleBasedOnFigma`
    padding: 2px 10px;
  `}
`
const StyledCrossButton = styled(CrossButton)`
  height: 100%;
  ${generateStyleBasedOnFigma`
    padding: 10px 7px 10px 0;
  `}
  svg {
    ${generateStyleBasedOnFigma`
      width: 8px;
      height: 8px;
    `}
  }
`
const StyledInnerBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  position: absolute;
  opacity: 0.8;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  border-radius: 2px;
  background-image: url('light-grain.png');
  background-size: cover;
  ${generateStyleBasedOnFigma`
    top: calc(50% + 0.5px);
    width: calc(100% - 4px);
    height: calc(100% - 4px);
  `}
`
