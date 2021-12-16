import React, { FCX } from 'react'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import styled, { css } from 'styled-components'
import type { UserData } from 'types/userData'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { useCalculateOverUsers } from 'hooks/useCalculateOverUsers'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'

type Props = {
  avatarStyleType: AVATAR_STYLE
  onClickDeleteBtn?: (index: number) => void
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  userData: UserData
  userCount: number
}

export const ManyUserAvatar: FCX<Props> = ({
  avatarStyleType,
  onClickDeleteBtn,
  userData,
  userCount,
  onClick,
  className,
}) => {
  const { maxBoxes, containerRef, avatarRef } = useCalculateOverUsers(userData.length)

  return (
    <StyledManyUserAvatarContainer
      ref={containerRef}
      onClick={event => onClick(event)}
      className={className}
      avatarStyleType={avatarStyleType}
      maxBoxes={maxBoxes}>
      {userData.map((userDatum, index) => {
        const boxCount = index + 1
        if (boxCount <= userData.length - userCount) return

        return (
          <StyledManyUserAvatar key={index}>
            <div ref={avatarRef}>
              <UserAvatarIcon
                avatarStyleType={avatarStyleType}
                iconImage={userDatum.icon_image}
                name={userDatum.name}
                occupation={userDatum.occupation.name}
                onClickDeleteBtn={() => onClickDeleteBtn && onClickDeleteBtn(index)}
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

  gap: ${calculateMinSizeBasedOnFigmaWidth(8)} 0;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 108.8888888%;
  padding: ${calculateMinSizeBasedOnFigmaWidth(11)} ${calculateMinSizeBasedOnFigmaWidth(5)};

  ${({ maxBoxes }) => css`
    grid-template-columns: ${() => [...Array(maxBoxes)].map(() => ' 1fr')};
  `}

  ${({ theme }) => css`
    background: ${theme.COLORS.BLACK_WHITE};
    border: solid 1px ${theme.COLORS.SILVER};
    box-shadow: 0px 1px 4px ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  `}
`

const StyledManyUserAvatar = styled.div`
  margin: 0 auto;
`
