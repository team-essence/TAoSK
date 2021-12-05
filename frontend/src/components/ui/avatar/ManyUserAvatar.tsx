import { AVATAR_STYLE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import type { UserDatas } from 'types/userDatas'
import { calculateVhBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { UserAvatarIcon } from './UserAvatarIcon'

type Props = {
  avatarStyleType: AVATAR_STYLE
  btnFunc?: () => void
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  userDatas: UserDatas
  className?: string
}

export const ManyUserAvatar: FC<Props> = ({
  avatarStyleType,
  btnFunc,
  userDatas,
  onClick,
  className,
}) => {
  return (
    <StyledManyUserAvatarContainer onClick={event => onClick(event)} className={className}>
      {userDatas.map((userData, index) => {
        if (index <= 4) return

        return (
          <StyledManyUserAvatar
            isGap={userDatas.length - 1 === index || (index - 4) % 6 === 0 ? false : true}
            key={index}>
            <UserAvatarIcon
              avatarStyleType={avatarStyleType}
              iconImage={userData.icon_image}
              name={userData.name}
              occupation={occupationList[userData.occupation_id]}
              btnFunc={btnFunc}
            />
          </StyledManyUserAvatar>
        )
      })}
    </StyledManyUserAvatarContainer>
  )
}

const StyledManyUserAvatarContainer = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.UNDER_POPOVER};
  position: absolute;
  padding: 12px;
  top: ${calculateVhBasedOnFigma(56)};
  right: ${calculateVhBasedOnFigma(-12)};
  display: grid;
  gap: 12px 0;
  grid-template-columns: auto auto auto auto auto auto;

  ${({ theme }) => css`
    background: ${theme.COLORS.BLACK_WHITE};
    border: solid 1px ${theme.COLORS.SILVER};
    box-shadow: 0px 1px 4px ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  `}
`

const StyledManyUserAvatar = styled.div<{ isGap: boolean }>`
  ${({ isGap }) =>
    isGap &&
    css`
      margin-right: 12px;
    `}
`
