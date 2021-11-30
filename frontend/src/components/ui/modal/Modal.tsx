import React, { FC, Dispatch, SetStateAction, ReactNode } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateMinSizeBasedOnFigmaWidth'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import styled from 'styled-components'

type Props = {
  title?: string
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
  className?: string
  children: ReactNode
}

export const Modal: FC<Props> = ({ title, shouldShow, setShouldShow, className, children }) => {
  return (
    <StyledWrapper className={className} shouldShow={shouldShow}>
      {title ? <StyledNamePlate>タスク作成</StyledNamePlate> : <></>}
      {children}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div<{ shouldShow: boolean }>`
  position: absolute;
  display: ${({ shouldShow }) => (shouldShow ? 'block' : 'none')};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 500px;
  height: 500px;
  background-image: url('/svg/modal-background.svg');
  background-size: contain;
  background-repeat: no-repeat;
`
const StyledNamePlate = styled.p`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(-55 / 2)};
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(468)};
  height: ${calculateMinSizeBasedOnFigmaWidth(55)};
  background-image: url('/svg/nameplate.svg');
  background-size: contain;
  background-repeat: no-repeat;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_20};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  ${({ theme }) => strokeTextShadow('2px', theme.COLORS.BLACK)};
`
