import React, { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { NotificationPopup } from '../popup/NotificationPopup'
import { useHover } from 'hooks/useHover'
import { UserMenuPopup } from '../popup/UserMenuPopup'

type Props = {
  className?: string
  iconImage: string
  name: string
  uid: string
  totalExp: number
}

export const ProjectListHeader: FC<Props> = ({ className, iconImage, name, uid, totalExp }) => {
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
    <StyledHeaderWrapper className={className}>
      <StyledLogoWrapper>
        <StyledLogo src="/svg/logo-transparent-background.svg" alt="ロゴ" />
      </StyledLogoWrapper>

      <StyledBellWrapper
        {...notificationEventHoverHandlers}
        onClick={event => handleNotificationPopup(event, isClickNotification)}>
        <img src="/svg/bell.svg" alt="通知アイコン" />
        {true && <StyledNotificationIcon />}
      </StyledBellWrapper>

      <StyledUserMenuIconWrapper
        {...userMenuEventHoverHandlers}
        onClick={event => handleUserMenuPopup(event, isClickUserMenu)}>
        <StyledUserMenuIcon>
          <img src={iconImage} alt="ユーザアイコン" />
        </StyledUserMenuIcon>

        <img src="/svg/menu-arrow_bottom.svg" alt="メニュー表示" />
      </StyledUserMenuIconWrapper>

      <StyledPopupContainer onClick={event => event.stopPropagation()}>
        <StyledNotificationPopup
          isHover={!!isNotificationHover}
          isClick={isClickNotification}
          closeClick={() => setIsClickNotification(false)}
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

const StyledBellWrapper = styled.div`
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

const StyledUserMenuIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
  cursor: pointer;
`

const StyledUserMenuIcon = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(32)};
  height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  border-radius: 50%;

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(32)};
    height: ${calculateMinSizeBasedOnFigmaWidth(32)};
    border-radius: 50%;
    object-fit: cover;
  }
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
