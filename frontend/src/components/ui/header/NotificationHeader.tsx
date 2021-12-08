import React, { FC } from 'react'
import styled from 'styled-components'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigmaWidth,
} from 'utils/calculateSizeBasedOnFigma'

type Props = {
  className?: string
  handlers:
    | boolean
    | {
        onMouseOver(): void
        onMouseOut(): void
      }
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isNotification: boolean
}

export const NotificationHeader: FC<Props> = ({ className, handlers, onClick, isNotification }) => {
  return (
    <StyledNotificationHeaderContainer className={className} {...handlers} onClick={onClick}>
      <img src="/svg/bell.svg" alt="通知アイコン" />
      {isNotification && <StyledNotificationIcon />}
    </StyledNotificationHeaderContainer>
  )
}

const StyledNotificationHeaderContainer = styled.div`
  margin-right: ${calculateMinSizeBasedOnFigmaWidth(16)};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledNotificationIcon = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaHeight(-2)};
  right: ${calculateMinSizeBasedOnFigmaWidth(1)};
  width: 9px;
  height: 9px;
  background: ${({ theme }) => theme.COLORS.DODGER_BLUE};
  border: solid 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border-radius: 50%;
`
