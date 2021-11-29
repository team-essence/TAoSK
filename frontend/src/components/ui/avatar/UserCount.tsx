import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { AVATAR_STYLE, AVATAR_STYLE_TYPE } from 'consts/avatarStyle'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { ManyUserAvatar } from './ManyUserAvatar'
import logger from 'utils/debugger/logger'
import { Group } from 'types/graphql.gen'

type Props = {
  userCount: number
  avatarStyleType: AVATAR_STYLE_TYPE
  groups: {
    __typename?: 'Group' | undefined
    id: string
    user: {
      __typename?: 'User' | undefined
      name: string
      icon_image: string
      occupation_id: number
    }
  }[]
}

export const UserCount: FC<Props> = ({ userCount, avatarStyleType, groups }) => {
  const [isPopUp, setIsPopUp] = useState(false)

  const closeModal = useCallback(event => {
    setIsPopUp(false)
    document.removeEventListener('click', closeModal)
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeModal)
    }
  }, [closeModal])

  const handlePopUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsPopUp(isPopup => !isPopUp)
    document.addEventListener('click', closeModal)
    event.stopPropagation()
  }

  if (avatarStyleType === AVATAR_STYLE.LIST)
    return (
      <StyledUserCountContainer>
        <StyledUserCountListContainer onClick={handlePopUp}>
          <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
        </StyledUserCountListContainer>

        {isPopUp && (
          <ManyUserAvatar
            groups={groups}
            avatarStyleType={avatarStyleType}
            onClick={event => event.stopPropagation()}
          />
        )}
      </StyledUserCountContainer>
    )
  else if (avatarStyleType === AVATAR_STYLE.MODAL)
    return (
      <StyledUserCountContainer>
        <StyledUserCountModalContainer onClick={handlePopUp}>
          <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
        </StyledUserCountModalContainer>

        {isPopUp && (
          <ManyUserAvatar
            groups={groups}
            avatarStyleType={avatarStyleType}
            onClick={event => event.stopPropagation()}
          />
        )}
      </StyledUserCountContainer>
    )
  else
    return (
      <StyledUserCountTaskContainer>
        <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
      </StyledUserCountTaskContainer>
    )
}

const StyledUserCountContainer = styled.div`
  position: relative;
  cursor: default;
`

const StyledUserCountListContainer = styled.div`
  width: ${calculateVhBasedOnFigma(50)};
  height: ${calculateVhBasedOnFigma(50)};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: ${({ theme }) => theme.COLORS.MINE_SHAFT2};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledUserCountModalContainer = styled.div`
  width: ${calculateVwBasedOnFigma(40)};
  height: ${calculateVwBasedOnFigma(40)};
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledUserCountTaskContainer = styled.div`
  width: ${calculateVwBasedOnFigma(24)};
  height: ${calculateVwBasedOnFigma(24)};
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCountText = styled.p<{ avatarStyleType: AVATAR_STYLE_TYPE }>`
  text-align: center;

  ${({ avatarStyleType, theme }) =>
    avatarStyleType === AVATAR_STYLE.TASK &&
    css`
      color: ${theme.COLORS.MINE_SHAFT};
      font-size: ${theme.FONT_SIZES.SIZE_10};
    `}

  ${({ avatarStyleType, theme }) =>
    avatarStyleType === AVATAR_STYLE.MODAL &&
    css`
      color: ${theme.COLORS.MONDO};
      font-size: ${theme.FONT_SIZES.SIZE_14};
    `}

  ${({ avatarStyleType, theme }) =>
    avatarStyleType === AVATAR_STYLE.LIST &&
    css`
      color: ${theme.COLORS.WHITE};
    `}
`
