import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { NotificationPopup } from '../popup/NotificationPopup'
import { useHover } from 'hooks/useHover'

type Props = {
  className?: string
  iconImage: string
}

export const ProjectListHeader: FC<Props> = ({ className, iconImage }) => {
  const [notificationHovered, notificationEventHoverHandlers] = useHover()
  const [isNotification, setIsNotification] = useState(false)

  return (
    <StyledHeaderWrapper className={className}>
      <StyledLogoWrapper>
        <StyledLogo src="/svg/logo-transparent-background.svg" alt="ロゴ" />
      </StyledLogoWrapper>

      <StyledBellWrapper
        {...notificationEventHoverHandlers}
        onClick={() => setIsNotification(isNotification => !isNotification)}>
        <img src="/svg/bell.svg" alt="通知アイコン" />
        {true && <StyledNotificationIcon />}
      </StyledBellWrapper>

      <StyledUserMenuIconWrapper>
        <StyledUserMenuIcon>
          <img src={iconImage} alt="ユーザアイコン" />
        </StyledUserMenuIcon>

        <img src="/svg/menu-arrow_bottom.svg" alt="メニュー表示" />
      </StyledUserMenuIconWrapper>

      <StyledNotificationPopup
        isHover={notificationHovered ? true : false}
        isClick={isNotification}
        closeClick={() => setIsNotification(false)}
      />
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

const StyledNotificationPopup = styled(NotificationPopup)`
  position: absolute;
  transform-origin: top right;
  top: ${calculateMinSizeBasedOnFigmaWidth(76)};
  right: ${calculateMinSizeBasedOnFigmaWidth(80)};
`
