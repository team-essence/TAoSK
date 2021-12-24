import React, { FCX, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { CoverPopup, POPUP_TYPE } from 'components/ui/popup/CoverPopup'
import { useDebounce } from 'hooks/useDebounce'
import { useAuthContext } from 'providers/AuthProvider'
import {
  GetProjectQuery,
  useCreateInvitationMutation,
  useSearchUsersLazyQuery,
} from 'pages/projectDetail/projectDetail.gen'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import logger from 'utils/debugger/logger'
import { useParams } from 'react-router'
import toast from 'utils/toast/toast'

type Props = {
  isHover: boolean
  isClick: boolean
  company: string
  closeClick: () => void
  groups: GetProjectQuery['getProjectById']['groups']
}

export const InvitationPopup: FCX<Props> = ({
  className,
  isHover,
  isClick,
  closeClick,
  company,
  groups,
}) => {
  const { id } = useParams()
  const [searchInput, setSearchInput] = useState('')
  const [searchUser, searchUserQuery] = useSearchUsersLazyQuery({
    onCompleted(data) {
      setSearchedList([])
      const users = data.findProjectDetailSameCompanyUsers.filter(user => {
        const groupsUser = groups.map(group => group.user.id)
        logger.debug(user.id)
        return !groupsUser.includes(user.id)
      })
      users.map(user => {
        setSearchedList(searchList => {
          const init = {
            id: user.id,
            name: user.name,
            iconImage: user.icon_image,
            isInvitation: !!user.invitations.length,
          }
          return [...searchList, init]
        })
      })
      !debouncedInputText && setSearchedList([])
    },
    fetchPolicy: 'network-only',
  })
  const [createInvitation] = useCreateInvitationMutation({
    onCompleted(data) {
      toast.success(`${data.createInvitation.user.name}さんを招待しました`)
      setSearchedList(searchedList => {
        return searchedList.map(searchedItem => {
          if (searchedItem.id === data.createInvitation.user.id) searchedItem.isInvitation = true

          return searchedItem
        })
      })
    },
    onError(err) {
      logger.debug(err)
      toast.error('招待に失敗しました')
    },
  })
  const debouncedInputText = useDebounce<string>(searchInput, 500)
  const { currentUser } = useAuthContext()
  const [searchedList, setSearchedList] = useState<
    {
      id: string
      name: string
      iconImage: string
      isInvitation: boolean
    }[]
  >([])

  useEffect(() => {
    if (!currentUser) return

    searchUser({
      variables: {
        searchUser: {
          project_id: String(id),
          input: debouncedInputText,
          company,
        },
      },
    })
  }, [debouncedInputText])

  useEffect(() => {
    if (isClick) return
    setSearchInput('')
    setSearchedList([])
  }, [isClick])

  const tryCreateInvitation = (projectId: string, userId: string) => {
    createInvitation({
      variables: {
        userId,
        projectId,
      },
    })
  }

  return (
    <StyledInvitationPopupContainer
      className={className}
      title="仲間を招待する"
      popupType={POPUP_TYPE.NORMAL}
      isHover={isHover}
      isClick={isClick}
      closeClick={closeClick}>
      <StyledInvitationContainer>
        <StyledSearchInputContainer>
          <StyledSearchImg src="/svg/search.svg" alt="検索アイコン" />

          <StyledSearchInput
            placeholder={'ユーザ名、UIDを入力'}
            onChange={event => setSearchInput(event.target.value)}
            value={searchInput}
          />
        </StyledSearchInputContainer>

        {!!searchedList.length && (
          <StyledSearchedItemContainer>
            {searchedList.map((searchedItem, index) => (
              <StyledSearchedItem key={index}>
                <StyledUserInfoContainer>
                  <StyledUserIconImageContainer>
                    <img src={searchedItem.iconImage} alt="ユーザアイコン" />
                  </StyledUserIconImageContainer>

                  <StyledUserInfo>
                    <StyledUserName>{searchedItem.name}</StyledUserName>
                    <StyledUserUid>@{searchedItem.id}</StyledUserUid>
                  </StyledUserInfo>
                </StyledUserInfoContainer>

                <StyledInvitationButton
                  disabled={searchedItem.isInvitation}
                  isInvitation={searchedItem.isInvitation}
                  onClick={() => tryCreateInvitation(String(id), searchedItem.id)}>
                  {searchedItem.isInvitation ? '招待済み' : '招待する'}
                </StyledInvitationButton>
              </StyledSearchedItem>
            ))}
          </StyledSearchedItemContainer>
        )}
      </StyledInvitationContainer>
    </StyledInvitationPopupContainer>
  )
}

const StyledInvitationPopupContainer = styled(CoverPopup)`
  max-height: ${calculateMinSizeBasedOnFigmaWidth(494)};
`

const StyledInvitationContainer = styled.div``

const StyledSearchInputContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(16)} ${calculateMinSizeBasedOnFigmaWidth(24)};
  position: relative;
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
  border: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${({ theme }) => theme.COLORS.FONT.SILVER};
`

const StyledSearchInput = styled.input`
  border-radius: 0 0 ${calculateMinSizeBasedOnFigmaWidth(4)} ${calculateMinSizeBasedOnFigmaWidth(4)};
  border: none;
  padding: ${calculateMinSizeBasedOnFigmaWidth(9)} ${calculateMinSizeBasedOnFigmaWidth(12)};
  padding-right: ${calculateMinSizeBasedOnFigmaWidth(4)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(3)};
  width: calc(100% - ${calculateMinSizeBasedOnFigmaWidth(30)});
  outline: 0;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.SILVER};
  }
`

const StyledSearchImg = styled.img`
  position: absolute;
  right: ${calculateMinSizeBasedOnFigmaWidth(12)};
  top: 50%;
  transform: translateY(-50%);
  font-size: 20;
  width: ${calculateMinSizeBasedOnFigmaWidth(16)};
  height: ${calculateMinSizeBasedOnFigmaWidth(16)};
`

const StyledSearchedItemContainer = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(24)};
  padding-top: ${calculateMinSizeBasedOnFigmaWidth(16)};
  border-top: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${({ theme }) => theme.COLORS.SILVER};
  max-height: ${calculateMinSizeBasedOnFigmaWidth(340)};
  overflow-y: scroll;
`

const StyledSearchedItem = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(12)} 0;
  border-bottom: 1px dashed ${({ theme }) => theme.COLORS.SILVER};
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    padding-top: 0;
  }
`

const StyledUserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(6)};
`

const StyledUserInfo = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(200)};
`
const StyledP = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledUserName = styled(StyledP)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZES.SIZE_14};
    font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
    color: ${theme.COLORS.FONT.BLACK};
    line-height: ${theme.FONT_SIZES.SIZE_14};
  `}
`

const StyledUserUid = styled(StyledP)`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZES.SIZE_12};
    font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
    color: ${theme.COLORS.DOVE_GRAY};
  `}
`

const StyledUserIconImageContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(40)};
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(40)};
    height: ${calculateMinSizeBasedOnFigmaWidth(40)};
    object-fit: cover;
    border-radius: 2px;
    box-shadow: 0 0 0 0.5px ${({ theme }) => theme.COLORS.BITTER_COCOA_BROWN};
    border: solid 1px ${({ theme }) => theme.COLORS.BRANDY};
  }
`

const StyledInvitationButton = styled.button<{ isInvitation: boolean }>`
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

  ${({ isInvitation, theme }) =>
    isInvitation &&
    css`
      background: ${convertIntoRGBA(theme.COLORS.BLACK, 0.2)};
      color: ${convertIntoRGBA(theme.COLORS.BLACK, 0.2)};
      cursor: default;
    `}
`
