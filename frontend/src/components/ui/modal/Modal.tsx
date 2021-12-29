import React, { FCX, ReactNode } from 'react'
import MuiModal from '@mui/material/Modal'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { CrossIcon } from 'components/ui/icon/CrossIcon'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { animation } from 'styles/animation/modalAnimation'

type Props = {
  title?: string
  shouldShow: boolean
  onClickCloseBtn: () => void
  children: ReactNode
  isSmall?: boolean
}

export const Modal: FCX<Props> = ({
  title,
  shouldShow,
  onClickCloseBtn,
  className,
  children,
  isSmall = false,
}) => {
  return (
    <StyledMuiModal
      open={shouldShow}
      onBackdropClick={() => onClickCloseBtn()}
      BackdropComponent={StyledBackdrop}
      BackdropProps={{ transitionDuration: 3000 }}>
      <StyledWrapper>
        <StyledCloseButton onClick={onClickCloseBtn}>
          <StyledCrossIcon color={theme.COLORS.DUSTY_GRAY} strokeLinecap="round" />
        </StyledCloseButton>

        {!!title && <StyledNamePlate>{title}</StyledNamePlate>}

        <StyledChildrenWrapper className={className}>{children}</StyledChildrenWrapper>

        {!isSmall && (
          <StyledDragonSymbolWrapper>
            <StyledDragonSymbolLeft />
            <StyledDragonSymbolRight />
          </StyledDragonSymbolWrapper>
        )}

        <StyledBackgroundWrapper>
          <StyledBackgroundLeft />
          <StyledBackgroundRight />
        </StyledBackgroundWrapper>
      </StyledWrapper>
    </StyledMuiModal>
  )
}

const StyledBackdrop = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.7)};
  ${animation.backdrop}
`
const StyledMuiModal = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`
const StyledWrapper = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.MODAL};
  position: relative;
  display: inline-block;
`
const StyledNamePlate = styled.p`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  position: absolute;
  top: ${calculateMinSizeBasedOnFigma(-55 / 2)};
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigma(468)};
  height: ${calculateMinSizeBasedOnFigma(55)};
  background-image: url('/svg/nameplate.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  ${animation.namePlate}
  ${({ theme }) =>
    css`
      color: ${theme.COLORS.WHITE};
      font-size: ${theme.FONT_SIZES.SIZE_20};
      font-weight: ${theme.FONT_WEIGHTS.BOLD};
      ${strokeTextShadow('2px', theme.COLORS.BLACK)};
    `}
`
const StyledChildrenWrapper = styled.div`
  ${animation.children}
`
const StyledBackgroundWrapper = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_2};
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const backgroundCss = css`
  width: 100%;
  height: 100%;
  background-image: url('/svg/modal-background.svg');
  background-size: 200% 100%;
  background-repeat: no-repeat;
`
const StyledBackgroundLeft = styled.div`
  ${backgroundCss}
  ${animation.bgLeft}
`
const StyledBackgroundRight = styled.div`
  ${backgroundCss}
  ${animation.bgRight}
`
const StyledDragonSymbolWrapper = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: ${calculateMinSizeBasedOnFigma(600)};
  height: ${calculateMinSizeBasedOnFigma(377)};
`
const dragonSymbolCss = css`
  width: 100%;
  height: 100%;
  background-image: url('/svg/dragon-symbol.svg');
  background-size: 200% 100%;
  background-repeat: no-repeat;
`
const StyledDragonSymbolLeft = styled.div`
  ${dragonSymbolCss}
  ${animation.bgLeft}
`
const StyledDragonSymbolRight = styled.div`
  ${dragonSymbolCss}
  ${animation.bgRight}
`
const StyledCloseButton = styled.button`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${calculateMinSizeBasedOnFigma(-40 / 2)};
  right: ${calculateMinSizeBasedOnFigma(27)};
  width: ${calculateMinSizeBasedOnFigma(40)};
  height: ${calculateMinSizeBasedOnFigma(40)};
  border: solid 4px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.8)};
  border-radius: 100%;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  ${animation.closeButton}
`
const StyledCrossIcon = styled(CrossIcon)`
  height: 100%;
  svg {
    width: ${calculateMinSizeBasedOnFigma(20)};
    height: ${calculateMinSizeBasedOnFigma(20)};
  }
`
