import React, { FCX } from 'react'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import styled, { css } from 'styled-components'
import type { UserDatas } from 'types/userDatas'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { useCalculateOverUsers } from 'hooks/useCalculateOverUsers'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'

type Props = {
  avatarStyleType: AVATAR_STYLE
  onClickDeleteBtn?: (index: number) => void
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  userDatas: UserDatas
  userCount: number
}

export const ManyUserAvatar: FCX<Props> = ({
  avatarStyleType,
  onClickDeleteBtn,
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
          <StyledManyUserAvatar key={index}>
            <div ref={avatarRef}>
              <UserAvatarIcon
                avatarStyleType={avatarStyleType}
                iconImage={userData.icon_image}
                name={userData.name}
                occupation={userData.occupation.name}
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
