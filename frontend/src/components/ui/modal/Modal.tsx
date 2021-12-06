import React, { FC, MouseEvent, ReactNode } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { CrossIcon } from 'components/ui/icon/CrossIcon'
import { theme } from 'styles/theme'
import styled, { css } from 'styled-components'

type Props = {
  title?: string
  shouldShow: boolean
  onClickCloseBtn: (e?: MouseEvent) => void
  className?: string
  children: ReactNode
}

export const Modal: FC<Props> = ({ title, shouldShow, onClickCloseBtn, className, children }) => {
  return (
    <>
      <StyledWrapper className={className} shouldShow={shouldShow}>
        <StyledCloseButton onClick={onClickCloseBtn}>
          <StyledCrossIcon color={theme.COLORS.DUSTY_GRAY} strokeLinecap="round" />
        </StyledCloseButton>
        {title ? <StyledNamePlate>タスク作成</StyledNamePlate> : <></>}
        {children}
        <StyledBackgroundDragonSymbol />
      </StyledWrapper>
      <StyledOverlay shouldShow={shouldShow} onClick={onClickCloseBtn} />
    </>
  )
}

const StyledWrapper = styled.div<{ shouldShow: boolean }>`
  z-index: ${({ theme }) => theme.Z_INDEX.MODAL};
  position: fixed;
  display: ${({ shouldShow }) => (shouldShow ? 'block' : 'none')};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-image: url('/svg/modal-background.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
const StyledNamePlate = styled.p`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
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
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_20};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  ${({ theme }) => strokeTextShadow('2px', theme.COLORS.BLACK)};
`
const StyledBackgroundDragonSymbol = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: ${calculateMinSizeBasedOnFigmaWidth(600)};
  height: ${calculateMinSizeBasedOnFigmaWidth(377)};
  background-image: url('/svg/dragon-symbol.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
const StyledCloseButton = styled.button`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${calculateMinSizeBasedOnFigmaWidth(-40 / 2)};
  right: ${calculateMinSizeBasedOnFigmaWidth(27)};
  width: ${calculateMinSizeBasedOnFigmaWidth(40)};
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  border: solid 4px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.8)};
  border-radius: 100%;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledCrossIcon = styled(CrossIcon)`
  height: 100%;
  svg {
    width: ${calculateMinSizeBasedOnFigmaWidth(20)};
    height: ${calculateMinSizeBasedOnFigmaWidth(20)};
  }
`
const StyledOverlay = styled.div<{ shouldShow: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  ${({ theme, shouldShow }) => css`
    z-index: ${theme.Z_INDEX.OVERLAY};
    display: ${shouldShow ? 'block' : 'none'};
    background-color: ${convertIntoRGBA(theme.COLORS.BLACK, 0.65)};
  `}
`
