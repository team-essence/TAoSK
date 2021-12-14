import React, { FCX, MouseEvent, ComponentProps } from 'react'
import styled, { css } from 'styled-components'
import { CrossIcon } from 'components/ui/icon/CrossIcon'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { BasicPopover } from 'components/ui/popup/BasicPopover'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import { theme } from 'styles/theme'

type Props = {
  title: string
  description: string
  buttonText: string
  onClickConfirmBtn: (e?: MouseEvent) => void
} & Omit<ComponentProps<typeof BasicPopover>, 'children'>

export const ConfirmPopup: FCX<Props> = ({
  className,
  title,
  description,
  buttonText,
  handleClose,
  onClickConfirmBtn,
  ...popoverProps
}) => {
  return (
    <BasicPopover handleClose={handleClose} {...popoverProps}>
      <StyleContainer className={className}>
        <StyledTitleWrapper>
          <p>{title}</p>
          <StyledCloseButton onClick={handleClose}>
            <StyledCrossIcon color={theme.COLORS.SILVER} strokeWidth={3} />
          </StyledCloseButton>
        </StyledTitleWrapper>
        <StyledDescriptionWrapper>
          <StyledDescription>{description}</StyledDescription>
          <StyledConfirmButton text={buttonText} onClick={onClickConfirmBtn} />
        </StyledDescriptionWrapper>
      </StyleContainer>
    </BasicPopover>
  )
}

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calculateMinSizeBasedOnFigma(318)};
  height: ${calculateMinSizeBasedOnFigma(188)};
  align-items: center;
  border-radius: ${calculateMinSizeBasedOnFigma(4)};
  ${({ theme }) =>
    css`
      z-index: ${theme.Z_INDEX.POPOVER};
      background-color: ${theme.COLORS.BLACK_WHITE};
      box-shadow: 0px ${calculateMinSizeBasedOnFigma(2)} ${theme.COLORS.MONDO};
      font-size: ${theme.FONT_SIZES.SIZE_16};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${calculateMinSizeBasedOnFigma(10)} ${calculateMinSizeBasedOnFigma(22)};
  ${({ theme }) =>
    css`
      border-bottom: solid 1px ${theme.COLORS.SILVER};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    `}
`
const StyledDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(13)};
  width: 100%;
  height: 100%;
  padding: 0 ${calculateMinSizeBasedOnFigma(22)};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.NORMAL};
  line-height: 1.5;
`
const StyledDescription = styled.p`
  width: 100%;
  white-space: pre-wrap;
`
const StyledConfirmButton = styled(CoarseButton)`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(32)};
  ${({ theme }) =>
    css`
      ${strokeTextShadow('1px', theme.COLORS.MONDO)};
      color: ${theme.COLORS.WHITE};
      > div {
        background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
        > div > div {
          background-color: ${convertIntoRGBA(theme.COLORS.RED_BERRY, 0.6)};
        }
      }
    `}
`
const StyledCloseButton = styled.button`
  cursor: pointer;
  width: ${calculateMinSizeBasedOnFigma(12)};
  height: ${calculateMinSizeBasedOnFigma(12)};
`
const StyledCrossIcon = styled(CrossIcon)`
  width: 100%;
  height: 100%;
`
