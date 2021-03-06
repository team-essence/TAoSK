import React, { FCX, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { ManyUserAvatar } from './ManyUserAvatar'
import type { UserData } from 'types/userData'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  userCount: number
  avatarStyleType: AVATAR_STYLE
  userData?: UserData
  onClickDeleteBtn?: (index: number) => void
}

export const UserCount: FCX<Props> = ({
  userCount,
  avatarStyleType,
  userData = [],
  className,
  onClickDeleteBtn,
}) => {
  const [isPopup, setIsPopUp] = useState(false)

  const closeModal = useCallback(() => {
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

  if (avatarStyleType === AVATAR_STYLE.LIST && userData.length) {
    return (
      <>
        <StyledUserCountContainer className={className}>
          <StyledUserCountListContainer onClick={handlePopUp}>
            <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
          </StyledUserCountListContainer>
        </StyledUserCountContainer>
        {isPopup && (
          <ManyUserAvatar
            userData={userData}
            userCount={userCount}
            avatarStyleType={avatarStyleType}
            onClick={event => event.stopPropagation()}
          />
        )}
      </>
    )
  } else if (avatarStyleType === AVATAR_STYLE.MODAL && userData.length) {
    return (
      <>
        <StyledUserCountContainer className={className}>
          <StyledUserCountModalContainer onClick={handlePopUp}>
            <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
          </StyledUserCountModalContainer>
        </StyledUserCountContainer>
        {isPopup && (
          <ManyUserAvatar
            userData={userData}
            userCount={userCount}
            avatarStyleType={avatarStyleType}
            onClick={event => event.stopPropagation()}
            onClickDeleteBtn={onClickDeleteBtn}
          />
        )}
      </>
    )
  } else {
    return (
      <StyledUserCountTaskContainer className={className}>
        <StyledCountText avatarStyleType={avatarStyleType}>+{userCount}</StyledCountText>
      </StyledUserCountTaskContainer>
    )
  }
}

const StyledUserCountContainer = styled.div`
  position: relative;
  cursor: default;
`

const StyledUserCountListContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigma(50)};
  height: ${calculateMinSizeBasedOnFigma(50)};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledUserCountModalContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigma(40)};
  height: ${calculateMinSizeBasedOnFigma(40)};
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledUserCountTaskContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigma(24)};
  height: ${calculateMinSizeBasedOnFigma(24)};
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
