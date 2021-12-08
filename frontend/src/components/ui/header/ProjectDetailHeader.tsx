import React, { FC, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Notifications } from 'types/notification'
import { List } from 'types/list'
import { SearchTask } from 'types/task'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { taskSearch } from 'utils/search/taskSearch'
import logger from 'utils/debugger/logger'
import { NotificationPopup } from 'components/ui/popup/NotificationPopup'
import { useHover } from 'hooks/useHover'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { UserMenuPopup } from 'components/ui/popup/UserMenuPopup'
import { InvitationPopup } from 'components/ui/popup/InvitationPopup'
import { UserMenuHeader } from 'components/ui/header/UserMenuHeader'
import { NotificationHeader } from 'components/ui/header/NotificationHeader'
import { InvitationHeader } from 'components/ui/header/InvitaionHeader'
import { SearchTaskPopup } from 'components/ui/popup/SearchTaskPopup'
import { UserAccountSettingModal } from 'components/models/user/UserAccountSettingModal'

type Props = {
  className?: string
  iconImage: string
  name: string
  uid: string
  totalExp: number
  notifications: Notifications
  company: string
  list: List[]
}

export const ProjectDetailHeader: FC<Props> = ({
  className,
  iconImage,
  name,
  uid,
  totalExp,
  notifications,
  company,
  list,
}) => {
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)
  const [searchTaskEvent, setSearchTaskEvent] = useState<React.MouseEvent<
    HTMLDivElement,
    MouseEvent
  > | null>(null)
  const [isNotificationHover, notificationEventHoverHandlers] = useHover()
  const [isClickNotification, setIsClickNotification] = useState(false)
  const [isUserMenuHover, userMenuEventHoverHandlers] = useHover()
  const [isClickUserMenu, setIsClickUserMenu] = useState(false)
  const [isInvitationHover, invitationEventHoverHandlers] = useHover()
  const [isClickInvitation, setIsIsClickInvitation] = useState(false)
  const [isSearchTaskPopup, setIsSearchTaskPopup] = useState(false)
  const [searchedTasks, setSearchTasks] = useState<SearchTask[]>([])
  const [searchTaskInput, setSearchTaskInput] = useState('')
  const debouncedInputText = useDebounce<string>(searchTaskInput, 500)

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

  const closeSearchTaskPopup = useCallback(event => {
    setSearchTaskInput('')
    setIsSearchTaskPopup(false)
    document.removeEventListener('click', closeSearchTaskPopup)
  }, [])

  const handleSearchTaskPopup = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isClick: boolean,
  ) => {
    setSearchTaskEvent(event)
    !isClick && allClose()
    setIsSearchTaskPopup(isSearchTaskPopup => !isSearchTaskPopup)
    document.addEventListener('click', closeSearchTaskPopup)
    event.stopPropagation()
  }

  const allClose = () => {
    setIsClickNotification(false)
    setIsClickUserMenu(false)
    setIsIsClickInvitation(false)
  }

  useEffect(() => {
    logger.debug(taskSearch(list, debouncedInputText))
    setSearchTasks(taskSearch(list, debouncedInputText))
  }, [debouncedInputText])

  useEffect(() => {
    if (!searchTaskInput || !searchTaskEvent || isSearchTaskPopup) return
    handleSearchTaskPopup(searchTaskEvent, isSearchTaskPopup)
  }, [searchTaskInput])

  return (
    <>
      <StyledHeaderWrapper className={className}>
        <StyledLeftContainer>
          <StyledLogoWrapper>
            <StyledLogo src="/svg/logo-transparent-background.svg" alt="ロゴ" />
          </StyledLogoWrapper>

          <StyledSearchTaskInputContainer>
            <StyledSearchImg src="/svg/search-task.svg" alt="検索アイコン" />

            <StyledSearchTaskInput
              placeholder="タスク名で検索"
              onChange={event => setSearchTaskInput(event.target.value)}
              value={searchTaskInput}
              onClick={event => handleSearchTaskPopup(event, isSearchTaskPopup)}
            />
          </StyledSearchTaskInputContainer>
        </StyledLeftContainer>

        <InvitationHeader
          handlers={invitationEventHoverHandlers}
          onClick={event => handleInvitationPopup(event, isClickInvitation)}
        />

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

        <StyledPopupContainer onClick={event => event.stopPropagation()}>
          <StyledInvitationPopup
            isHover={!!isInvitationHover}
            isClick={isClickInvitation}
            closeClick={() => setIsIsClickInvitation(false)}
            company={company}
          />
        </StyledPopupContainer>

        {isSearchTaskPopup && (
          <StyledPopupContainer onClick={event => event.stopPropagation()}>
            <StyledSearchTaskPopup searchedTasks={searchedTasks} />
          </StyledPopupContainer>
        )}
      </StyledHeaderWrapper>
      <UserAccountSettingModal shouldShow={shouldShowModal} setShouldShow={setShouldShowModal} />
    </>
  )
}

const StyledHeaderWrapper = styled.header`
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
  height: ${calculateMinSizeBasedOnFigmaWidth(43)};
`

const StyledLeftContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(60)};
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

const StyledInvitationPopup = styled(InvitationPopup)`
  position: absolute;
  transform-origin: top right;
  top: ${calculateMinSizeBasedOnFigmaWidth(76)};
  right: ${calculateMinSizeBasedOnFigmaWidth(125)};
`

const StyledSearchTaskInputContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(16)} ${calculateMinSizeBasedOnFigmaWidth(24)};
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};

  ${({ theme }) => css`
    border: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${theme.COLORS.SILVER_CHALICE};
    background: ${theme.COLORS.DOVE_GRAY};
  `}
`

const StyledSearchTaskInput = styled.input`
  border-radius: 0 0 ${calculateMinSizeBasedOnFigmaWidth(4)} ${calculateMinSizeBasedOnFigmaWidth(4)};
  border: none;
  padding: ${calculateMinSizeBasedOnFigmaWidth(9)} ${calculateMinSizeBasedOnFigmaWidth(12)};
  padding-right: ${calculateMinSizeBasedOnFigmaWidth(12)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(3)};
  width: calc(100% - ${calculateMinSizeBasedOnFigmaWidth(20)});
  outline: 0;
  background: ${({ theme }) => theme.COLORS.DOVE_GRAY};
  color: ${({ theme }) => theme.COLORS.WHITE};

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`

const StyledSearchImg = styled.img`
  position: absolute;
  left: ${calculateMinSizeBasedOnFigmaWidth(8)};
  top: 50%;
  transform: translateY(-50%);
  font-size: 20;
  width: ${calculateMinSizeBasedOnFigmaWidth(16)};
  height: ${calculateMinSizeBasedOnFigmaWidth(16)};
`

const StyledSearchTaskPopup = styled(SearchTaskPopup)`
  position: absolute;
  transform-origin: top left;
  top: ${({ theme }) => theme.HEADER_HEIGHT};
  left: ${calculateMinSizeBasedOnFigmaWidth(230)};
`
