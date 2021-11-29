import { AVATAR_STYLE_TYPE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { avatarGroups } from 'types/avatarGroups'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateMinSizeBasedOnFigmaHeight'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { UserAvatarIcon } from './UserAvatarIcon'

type Props = {
  avatarStyleType: AVATAR_STYLE_TYPE
  btnFunc?: () => void
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  groups: avatarGroups
  className?: string
}

export const ManyUserAvatar: FC<Props> = ({
  avatarStyleType,
  btnFunc,
  groups,
  onClick,
  className,
}) => {
  return (
    <StyledManyUserAvatarContainer onClick={event => onClick(event)} className={className}>
      {groups.map((group, index) => {
        if (index <= 4) return

        return (
          <StyledManyUserAvatar
            isGap={groups.length - 1 === index || (index - 4) % 6 === 0 ? false : true}
            key={index}>
            <UserAvatarIcon
              avatarStyleType={avatarStyleType}
              iconImage={group.user.icon_image}
              name={group.user.name}
              occupation={occupationList[group.user.occupation_id]}
              btnFunc={btnFunc}
            />
          </StyledManyUserAvatar>
        )
      })}
    </StyledManyUserAvatarContainer>
  )
}

const StyledManyUserAvatarContainer = styled.div`
  position: absolute;
  padding: 12px;
  top: ${calculateMinSizeBasedOnFigmaHeight(56)};
  right: ${calculateMinSizeBasedOnFigmaHeight(-12)};
  display: grid;
  gap: 12px 0;
  grid-template-columns: auto auto auto auto auto auto;

  ${({ theme }) => css`
    background: ${theme.COLORS.BLACK_WHITE};
    border: solid 1px ${theme.COLORS.SLIVER3};
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
