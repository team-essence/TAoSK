import React, { FC } from 'react'
import styled from 'styled-components'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type Props = {
  iconType: ICON_TYPE
}

export const ICON_TYPE = {
  LIST: 'list',
  TASK: 'Task',
} as const
type ICON_TYPE = typeof ICON_TYPE[keyof typeof ICON_TYPE]

export const UserAvatarIcon: FC<Props> = ({ iconType }) => {
  if (iconType === ICON_TYPE.LIST) return <StyledUserAvatarIconListContainer />

  return <StyledUserAvatarIconTaskContainer />
}

const StyledUserAvatarIconListContainer = styled.div`
  width: ${calculateVhBasedOnFigma(50)};
  height: ${calculateVhBasedOnFigma(50)};
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT2};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: url('https://akiba-souken.k-img.com/assets/images/article/000/928/t640_928199.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const StyledUserAvatarIconTaskContainer = styled.div`
  width: ${calculateVwBasedOnFigma(24)};
  height: ${calculateVwBasedOnFigma(24)};
  border-radius: 4px;
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  background: url('https://akiba-souken.k-img.com/assets/images/article/000/928/t640_928199.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
