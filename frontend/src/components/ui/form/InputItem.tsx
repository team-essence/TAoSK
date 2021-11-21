import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { CrossButton } from 'components/ui/button/CrossButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'

type Props = {
  className?: string
  itemName: string
  onClick?: (e: MouseEvent) => void
}

export const InputItem: FC<Props> = ({ className, itemName, onClick }) => {
  return (
    <StyledOuterWrapper className={className}>
      <StyledOuterMask>
        <StyledInnerWrapper>
          {itemName}
          <StyledCrossButton color={theme.COLORS.CHOCOLATE} onClick={onClick} />
        </StyledInnerWrapper>
      </StyledOuterMask>
    </StyledOuterWrapper>
  )
}

const StyledOuterWrapper = styled.div`
  height: 32px;
  border-radius: 2px;
  background-image: url('grain.png');
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`
const StyledOuterMask = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.BRIDAL_HEATH, 0.42)};
`
const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 97.895%;
  height: 28px;
  border-radius: 2px;
  background-image: url('light-grain.png');
  background-size: cover;
`
const StyledCrossButton = styled(CrossButton)`
  svg {
    width: 8px;
    height: 8px;
  }
`
