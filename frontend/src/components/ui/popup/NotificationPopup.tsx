import React, { FC, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { CoverPopup, POPUP_TYPE } from 'components/ui/popup/CoverPopup'
import date from 'utils/date/date'
import logger from 'utils/debugger/logger'
import { Notifications } from 'types/notification'

type Props = {
  className?: string
  isHover: boolean
  isClick: boolean
  closeClick: () => void
  notifications: Notifications
}

export const NotificationPopup: FC<Props> = ({
  className,
  isHover,
  isClick,
  closeClick,
  notifications,
}) => {
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (!location) return
    logger.debug(location.origin)
    setOrigin(location.origin)
  }, [location])

  return (
    <StyledNotificationPopupContainer
      className={className}
      title="通知"
      popupType={POPUP_TYPE.NORMAL}
      isHover={isHover}
      isClick={isClick}
      closeClick={closeClick}>
      <StyledInvitationItemContainer>
        {notifications.map((notification, index) => (
          <StyledInvitationItem key={index}>
            <StyledInvitationText>
              <span>【{notification.name}】</span>
              に招待されました
            </StyledInvitationText>

            <StyledInvitationUrlContainer>
              <p>
                <span>URL：</span>
                <a href={`${origin}/invitation/${notification.id}`}>
                  {origin}/invitation/{notification.id}
                </a>
              </p>
            </StyledInvitationUrlContainer>

            <StyledInvitationTimeContainer>
              <p>{date.formatDay(notification.createAt)}</p>
            </StyledInvitationTimeContainer>
          </StyledInvitationItem>
        ))}
      </StyledInvitationItemContainer>
    </StyledNotificationPopupContainer>
  )
}

const StyledNotificationPopupContainer = styled(CoverPopup)``

const StyledInvitationItemContainer = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(24)};
`

// TODO: 今後招待以外の通知実装された時のために名前にinvitationを入れている
const StyledInvitationItem = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(12)} 0;
  width: ${calculateMinSizeBasedOnFigmaWidth(312)};

  border-bottom: 1px dashed ${({ theme }) => theme.COLORS.SILVER};

  &:last-child {
    border-bottom: none;
  }
`

const StyledInvitationText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  color: ${({ theme }) => theme.COLORS.FONT.BLACK};

  span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  }
`

const StyledInvitationUrlContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(8)} 0;
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(12)};
  border: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${({ theme }) => theme.COLORS.SILVER};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};

  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.COLORS.DODGER_BLUE};

    span {
      color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
    }

    a {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: ${calculateMinSizeBasedOnFigmaWidth(3)};
        left: 0;
        width: 100%;
        height: ${calculateMinSizeBasedOnFigmaWidth(1)};
        background: ${({ theme }) => theme.COLORS.DODGER_BLUE};
      }
    }
  }
`

const StyledInvitationTimeContainer = styled.div`
  p {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
    color: ${({ theme }) => theme.COLORS.TOPAZ};
  }
`
