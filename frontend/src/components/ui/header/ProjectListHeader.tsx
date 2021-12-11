import React, { FCX, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { UserAccountSettingModal } from 'components/models/user/UserAccountSettingModal'
import { NotificationPopup } from 'components/ui/popup/NotificationPopup'
import { useHover } from 'hooks/useHover'
import { UserMenuPopup } from 'components/ui/popup/UserMenuPopup'
import { Notifications } from 'types/notification'
import { UserMenuHeader } from 'components/ui/header/UserMenuHeader'
import { NotificationHeader } from 'components/ui/header/NotificationHeader'

type Props = {
  iconImage: string
  name: string
  uid: string
  totalExp: number
  notifications: Notifications
}

export const ProjectListHeader: FCX<Props> = ({
  className,
  iconImage,
  name,
  uid,
  totalExp,
  notifications,
}) => {
  const navigate = useNavigate()
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)
  const [isNotificationHover, notificationEventHoverHandlers] = useHover()
  const [isClickNotification, setIsClickNotification] = useState(false)
  const [isUserMenuHover, userMenuEventHoverHandlers] = useHover()
  const [isClickUserMenu, setIsClickUserMenu] = useState(false)

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

  const allClose = () => {
    setIsClickNotification(false)
    setIsClickUserMenu(false)
  }

  return (
    <>
      <StyledHeaderWrapper className={className}>
        <StyledLogoWrapper onClick={() => navigate('/')}>
          <StyledLogo src="/svg/logo-transparent-background.svg" alt="ロゴ" />
        </StyledLogoWrapper>

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
            setShouldShowModal={setShouldShowModal}
          />
        </StyledPopupContainer>
      </StyledHeaderWrapper>
      <UserAccountSettingModal shouldShow={shouldShowModal} setShouldShow={setShouldShowModal} />
    </>
  )
}

const StyledHeaderWrapper = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.Z_INDEX.HEADER};
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
  cursor: pointer;
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
