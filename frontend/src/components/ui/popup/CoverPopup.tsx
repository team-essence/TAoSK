import React, { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { CrossButton } from 'components/ui/button/CrossButton'
import logger from 'utils/debugger/logger'
import { theme } from 'styles/theme'

type Props = {
  className?: string
  popupType: POPUP_TYPE
  title: string
  children: ReactNode
}

// TODO: 3つのpopupサイズでデザインで上がってきた時のために3つ用意
export const POPUP_TYPE = {
  LARGE: 'large',
  NORMAL: 'normal',
  SMALL: 'small',
} as const
export type POPUP_TYPE = typeof POPUP_TYPE[keyof typeof POPUP_TYPE]

export const CoverPopup: FC<Props> = ({ className, popupType, title, children }) => {
  return (
    <StyledCoverPopupContainer className={className} popupType={popupType}>
      <StyledCoverPopupHeader>
        <p>{title}</p>
        <StyledCoverPopupCrossButton
          color={theme.COLORS.SILVER}
          onClick={() => logger.debug('hoge')}
        />
      </StyledCoverPopupHeader>

      <StyledCoverPopupContent>{children}</StyledCoverPopupContent>
    </StyledCoverPopupContainer>
  )
}

const StyledCoverPopupContainer = styled.div<{ popupType: POPUP_TYPE }>`
  background: ${theme.COLORS.WHITE};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};

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
`

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

const StyledCoverPopupCrossButton = styled(CrossButton)`
  svg {
    width: ${calculateMinSizeBasedOnFigmaWidth(12)};
    height: ${calculateMinSizeBasedOnFigmaWidth(12)};

    path {
      stroke-width: ${calculateMinSizeBasedOnFigmaWidth(1.5)};
    }
  }
`

const StyledCoverPopupContent = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(24)};
`
