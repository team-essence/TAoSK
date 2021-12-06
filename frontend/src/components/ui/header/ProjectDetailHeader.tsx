import React, { FC, useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { NotificationPopup } from '../popup/NotificationPopup'
import { useHover } from 'hooks/useHover'
import { UserMenuPopup } from '../popup/UserMenuPopup'
import { Notifications } from 'types/notification'
import { InvitationPopup } from '../popup/InvitationPopup'
import { UserMenuHeader } from './UserMenuHeader'
import { NotificationHeader } from './NotificationHeader'

type Props = {
  className?: string
  iconImage: string
  name: string
  uid: string
  totalExp: number
  notifications: Notifications
}

export const ProjectDetailHeader: FC<Props> = ({
  className,
  iconImage,
  name,
  uid,
  totalExp,
  notifications,
}) => {
  const [isNotificationHover, notificationEventHoverHandlers] = useHover()
  const [isClickNotification, setIsClickNotification] = useState(false)
  const [isUserMenuHover, userMenuEventHoverHandlers] = useHover()
  const [isClickUserMenu, setIsClickUserMenu] = useState(false)
  const [isInvitationHover, invitationEventHoverHandlers] = useHover()
  const [isClickInvitation, setIsIsClickInvitation] = useState(false)

  const closeNotificationPopup = useCallback(event => {
    setIsClickNotification(false)
    document.removeEventListener('click', closeNotificationPopup)
  }, [])

  const handleNotificationPopup = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isClick: boolean,
  ) => {
    !isClick && allClose()
    setIsClickNotification(isClickNotification => !isClickNotification)
    document.addEventListener('click', closeNotificationPopup)
    event.stopPropagation()
  }

  const closeUserMenuPopup = useCallback(event => {
    setIsClickUserMenu(false)
    document.removeEventListener('click', closeUserMenuPopup)
  }, [])

  const handleUserMenuPopup = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isClick: boolean,
  ) => {
    !isClick && allClose()
    setIsClickUserMenu(isClickUserMenu => !isClickUserMenu)
    document.addEventListener('click', closeUserMenuPopup)
    event.stopPropagation()
  }

  const closeInvitationPopup = useCallback(event => {
    setIsIsClickInvitation(false)
    document.removeEventListener('click', closeInvitationPopup)
  }, [])

  const handleInvitationPopup = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isClick: boolean,
  ) => {
    !isClick && allClose()
    setIsIsClickInvitation(isClickInvitation => !isClickInvitation)
    document.addEventListener('click', closeInvitationPopup)
    event.stopPropagation()
  }

  const allClose = () => {
    setIsClickNotification(false)
    setIsClickUserMenu(false)
    setIsIsClickInvitation(false)
  }

  return (
    <StyledHeaderWrapper className={className}>
      <StyledLogoWrapper>
        <StyledLogo src="/svg/logo-transparent-background.svg" alt="ロゴ" />
      </StyledLogoWrapper>

      <StyledInvitationWrapper
        {...invitationEventHoverHandlers}
        onClick={event => handleInvitationPopup(event, isClickInvitation)}>
        <p>招待</p>
      </StyledInvitationWrapper>

      <NotificationHeader
        handlers={notificationEventHoverHandlers}
        onClick={event => handleNotificationPopup(event, isClickNotification)}
        isNotification={!!notifications.length}
      />

      <UserMenuHeader
        handlers={userMenuEventHoverHandlers}
        iconImage={iconImage}
        onClick={event => handleUserMenuPopup(event, isClickUserMenu)}
      />

      <StyledPopupContainer onClick={event => event.stopPropagation()}>
        <StyledNotificationPopup
          isHover={!!isNotificationHover}
          isClick={isClickNotification}
          closeClick={() => setIsClickNotification(false)}
          notifications={notifications}
        />
      </StyledPopupContainer>

      <StyledPopupContainer onClick={event => event.stopPropagation()}>
        <StyledUserMenuPopup
          isHover={!!isUserMenuHover}
          isClick={isClickUserMenu}
          closeClick={() => setIsClickUserMenu(false)}
          iconImage={iconImage}
          name={name}
          uid={uid}
          totalExp={totalExp}
        />
      </StyledPopupContainer>

      <StyledPopupContainer onClick={event => event.stopPropagation()}>
        <StyledInvitationPopup
          isHover={!!isInvitationHover}
          isClick={isClickInvitation}
          closeClick={() => setIsIsClickInvitation(false)}
          company="HAL株式会社"
        />
      </StyledPopupContainer>
    </StyledHeaderWrapper>
  )
}

const StyledHeaderWrapper = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.Z_INDEX.HEADER};
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(28)};
  width: 100vw;
  height: ${({ theme }) => theme.HEADER_HEIGHT};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
`

const StyledLogoWrapper = styled.div`
  object-fit: contain;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigmaWidth(43)};
`

const StyledLogo = styled.img`
  height: ${calculateMinSizeBasedOnFigmaWidth(43)};
`

const StyledPopupContainer = styled.div``

const StyledNotificationPopup = styled(NotificationPopup)`
  position: absolute;
  transform-origin: top right;
  top: ${calculateMinSizeBasedOnFigmaWidth(76)};
  right: ${calculateMinSizeBasedOnFigmaWidth(80)};
`

const StyledUserMenuPopup = styled(UserMenuPopup)`
  position: absolute;
  transform-origin: top right;
  top: ${calculateMinSizeBasedOnFigmaWidth(76)};
  right: ${calculateMinSizeBasedOnFigmaWidth(30)};
`

const StyledInvitationWrapper = styled.div`
  margin-right: ${calculateMinSizeBasedOnFigmaWidth(26)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(3)} ${calculateMinSizeBasedOnFigmaWidth(0)};
  width: ${calculateMinSizeBasedOnFigmaWidth(64)};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
  text-align: center;
  cursor: pointer;

  ${({ theme }) => css`
    background: ${theme.COLORS.DODGER_BLUE};
    font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    font-size: ${theme.FONT_SIZES.SIZE_12};
    line-height: ${theme.FONT_SIZES.SIZE_16};
    color: ${theme.COLORS.WHITE};
  `}
`

const StyledInvitationPopup = styled(InvitationPopup)`
  position: absolute;
  transform-origin: top right;
  top: ${calculateMinSizeBasedOnFigmaWidth(76)};
  right: ${calculateMinSizeBasedOnFigmaWidth(125)};
`
