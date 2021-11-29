import { AVATAR_STYLE_TYPE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { UserAvatarIcon } from './UserAvatarIcon'

type Props = {
  avatarStyleType: AVATAR_STYLE_TYPE
  btnFunc?: () => void
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
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

export const ManyUserAvatar: FC<Props> = ({ avatarStyleType, btnFunc, groups, onClick }) => {
  return (
    <StyledManyUserAvatarContainer onClick={event => onClick(event)}>
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
  top: 48px;
  right: ${calculateVhBasedOnFigma(0)};
  border: solid 1px ${({ theme }) => theme.COLORS.SLIVER3};
  box-shadow: 0px 1px 4px ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  display: grid;
  gap: 12px 0;
  grid-template-columns: auto auto auto auto auto auto;
`

const StyledManyUserAvatar = styled.div<{ isGap: boolean }>`
  ${({ isGap }) =>
    isGap &&
    css`
      margin-right: 12px;
    `}
`
