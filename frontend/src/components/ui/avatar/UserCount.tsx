import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { ManyUserAvatar } from './ManyUserAvatar'
import { avatarGroups } from 'types/avatarGroups'
import { calculateVhBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  userCount: number
  avatarStyleType: AVATAR_STYLE
  groups?: avatarGroups
  className?: string
}

export const UserCount: FC<Props> = ({ userCount, avatarStyleType, groups, className }) => {
  const [isPopup, setIsPopUp] = useState(false)

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
    setIsPopUp(isPopup => !isPopup)
    document.addEventListener('click', closeModal)
    event.stopPropagation()
  }

  if (avatarStyleType === AVATAR_STYLE.LIST && groups)
    return (
      <StyledUserCountContainer className={className}>
        <StyledUserCountListContainer onClick={handlePopUp}>
          <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
        </StyledUserCountListContainer>

        {isPopup && (
          <ManyUserAvatar
            groups={groups}
            avatarStyleType={avatarStyleType}
            onClick={event => event.stopPropagation()}
          />
        )}
      </StyledUserCountContainer>
    )
  else if (avatarStyleType === AVATAR_STYLE.MODAL && groups)
    return (
      <StyledUserCountContainer className={className}>
        <StyledUserCountModalContainer onClick={handlePopUp}>
          <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
        </StyledUserCountModalContainer>

        {isPopup && (
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
      <StyledUserCountTaskContainer className={className}>
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
  background: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledUserCountModalContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(40)};
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledUserCountTaskContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaHeight(24)};
  height: ${calculateMinSizeBasedOnFigmaHeight(24)};
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCountText = styled.p<{ avatarStyleType: AVATAR_STYLE }>`
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
