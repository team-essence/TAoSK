import React, { FCX, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { theme } from 'styles/theme'
import { CrossIcon } from 'components/ui/icon/CrossIcon'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type Props = {
  popupType: POPUP_TYPE
  title: string
  children: ReactNode
  isHover: boolean
  isClick: boolean
  closeClick: () => void
}

// TODO: 3つのpopupサイズでデザインで上がってきた時のために3つ用意
export const POPUP_TYPE = {
  LARGE: 'large',
  NORMAL: 'normal',
  SMALL: 'small',
} as const
export type POPUP_TYPE = typeof POPUP_TYPE[keyof typeof POPUP_TYPE]

export const CoverPopup: FCX<Props> = ({
  className,
  popupType,
  title,
  children,
  isHover,
  isClick,
  closeClick,
}) => {
  return (
    <StyledCoverPopupContainer
      className={className}
      popupType={popupType}
      isHover={isHover}
      isClick={isClick}>
      <StyledPopupWrapper isClick={isClick}>
        <StyledCoverPopupHeader>
          <p>{title}</p>
          <StyledButton onClick={closeClick}>
            <StyledCrossIcon color={theme.COLORS.SILVER} />
          </StyledButton>
        </StyledCoverPopupHeader>

        <StyledCoverPopupContent>{children}</StyledCoverPopupContent>
      </StyledPopupWrapper>
    </StyledCoverPopupContainer>
  )
}

const StyledCoverPopupContainer = styled.div<{
  popupType: POPUP_TYPE
  isHover: boolean
  isClick: boolean
}>`
  background: ${theme.COLORS.WHITE};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
  transform: scale(0);
  transition: all 0.2s cubic-bezier(0.77, 0, 0.17, 1.02) 0s;

  ${({ theme }) => css`
    box-shadow: 0px ${calculateMinSizeBasedOnFigmaWidth(4)} ${calculateMinSizeBasedOnFigmaWidth(4)}
      ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  `}

  ${({ popupType }) => css`
    ${popupType === POPUP_TYPE.SMALL &&
    css`
      width: ${calculateMinSizeBasedOnFigmaWidth(270)};
    `}

    ${popupType === POPUP_TYPE.NORMAL &&
    css`
      width: ${calculateMinSizeBasedOnFigmaWidth(360)};
    `}
  `}

  ${({ isHover }) =>
    isHover &&
    css`
      transform-origin: top right;
      transform: scale(0.1);
    `}

      ${({ isClick }) =>
    isClick &&
    css`
      transition: all 0.2s cubic-bezier(0.77, 0, 0.17, 1.02) 0s;
      transform: scale(1);
    `}
`

const StyledPopupWrapper = styled.div<{ isClick: boolean }>`
  opacity: 0;
  transition: all 0.1s cubic-bezier(0.77, 0, 0.17, 1.02) 0s;

  ${({ isClick }) =>
    isClick &&
    css`
      opacity: 1;
      transition: all 0.4s cubic-bezier(0.77, 0, 0.17, 1.02) 0s;
    `}
`

const StyledButton = styled.button``

const StyledCoverPopupHeader = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(18)} ${calculateMinSizeBasedOnFigmaWidth(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${theme.COLORS.SILVER};

  p {
    color: ${theme.COLORS.SHIP_GRAY};
    font-size: ${theme.FONT_SIZES.SIZE_14};
  }
`

const StyledCrossIcon = styled(CrossIcon)`
  svg {
    width: ${calculateMinSizeBasedOnFigmaWidth(12)};
    height: ${calculateMinSizeBasedOnFigmaWidth(12)};

    path {
      stroke-width: ${calculateMinSizeBasedOnFigmaWidth(1.5)};
    }
  }
`

const StyledCoverPopupContent = styled.div``
