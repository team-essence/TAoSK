import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { CrossIcon } from 'components/ui/icon/CrossIcon'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'

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
          <button onClick={onClick}>
            <StyledCrossIcon color={theme.COLORS.CHOCOLATE} />
          </button>
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
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
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
  padding: ${calculateMinSizeBasedOnFigmaWidth(2)} ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledCrossIcon = styled(CrossIcon)`
  height: 100%;
  padding: ${calculateMinSizeBasedOnFigmaWidth(10)} ${calculateMinSizeBasedOnFigmaWidth(7)}
    ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
  svg {
    width: ${calculateMinSizeBasedOnFigmaWidth(8)};
    height: ${calculateMinSizeBasedOnFigmaWidth(8)};
  }
`
const StyledInnerBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  position: absolute;
  opacity: 0.8;
  top: calc(50% + ${calculateMinSizeBasedOnFigmaWidth(0.5)});
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: calc(100% - ${calculateMinSizeBasedOnFigmaWidth(4)});
  height: calc(100% - ${calculateMinSizeBasedOnFigmaWidth(4)});
  border-radius: 2px;
  background-image: url('light-grain.png');
  background-size: cover;
`
