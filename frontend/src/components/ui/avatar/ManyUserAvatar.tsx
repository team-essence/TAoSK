import { AVATAR_STYLE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import type { UserDatas } from 'types/userDatas'
import { calculateVwBasedOnFigma, calculateVhBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { useCalculateOverUsers } from 'hooks/useCalculateOverUsers'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'

type Props = {
  avatarStyleType: AVATAR_STYLE
  btnFunc?: () => void
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  userDatas: UserDatas
  userCount: number
  className?: string
}

export const ManyUserAvatar: FC<Props> = ({
  avatarStyleType,
  btnFunc,
  userDatas,
  userCount,
  onClick,
  className,
}) => {
  const { maxBoxes, containerRef, avatarRef } = useCalculateOverUsers(userDatas.length)

  return (
    <StyledManyUserAvatarContainer
      ref={containerRef}
      onClick={event => onClick(event)}
      className={className}
      avatarStyleType={avatarStyleType}
      maxBoxes={maxBoxes}>
      {userDatas.map((userData, index) => {
        const boxCount = index + 1
        if (boxCount <= userDatas.length - userCount) return

        return (
          <StyledManyUserAvatar
            isGap={userDatas.length === boxCount || (index - 4) % 6 === 0 ? false : true}
            avatarStyleType={avatarStyleType}
            key={index}>
            <div ref={avatarRef}>
              <UserAvatarIcon
                avatarStyleType={avatarStyleType}
                iconImage={userData.icon_image}
                name={userData.name}
                occupation={occupationList[userData.occupation_id]}
                btnFunc={btnFunc}
              />
            </div>
          </StyledManyUserAvatar>
        )
      })}
    </StyledManyUserAvatarContainer>
  )
}

const StyledManyUserAvatarContainer = styled.div<{
  avatarStyleType: AVATAR_STYLE
  maxBoxes: number
}>`
  z-index: ${({ theme }) => theme.Z_INDEX.UNDER_POPOVER};
  position: absolute;
  display: grid;

  ${({ maxBoxes }) => css`
    grid-template-columns: ${() => [...Array(maxBoxes)].map(() => ' auto')};
  `}

  ${({ theme }) => css`
    background: ${theme.COLORS.BLACK_WHITE};
    border: solid 1px ${theme.COLORS.SILVER};
    box-shadow: 0px 1px 4px ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  `}

  ${({ avatarStyleType }) => {
    if (avatarStyleType === 'modal') {
      return css`
        gap: ${calculateVwBasedOnFigma(8)} 0;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding: ${calculateVwBasedOnFigma(11)} ${calculateVwBasedOnFigma(5)};
        width: ${calculateVwBasedOnFigma(294)};
      `
    } else {
      return css`
        gap: ${calculateVhBasedOnFigma(12)} 0;
        top: ${calculateVhBasedOnFigma(56)};
        right: ${calculateVhBasedOnFigma(-12)};
        padding: ${calculateVhBasedOnFigma(12)};
      `
    }
  }}
`

const StyledManyUserAvatar = styled.div<{ isGap: boolean; avatarStyleType: AVATAR_STYLE }>`
  ${({ isGap, avatarStyleType }) => {
    if (avatarStyleType === 'modal') {
      return css`
        margin: 0 auto;
      `
    } else {
      return (
        isGap &&
        css`
          margin-right: ${calculateVhBasedOnFigma(12)};
        `
      )
    }
  }}
`
