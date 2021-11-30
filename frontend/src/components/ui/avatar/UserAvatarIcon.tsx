import React, { FC } from 'react'
import styled from 'styled-components'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateMinSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type Props = {
  iconType: ICON_TYPE
  iconImage: string
  size: number | `${number}px`
  closeFunc?: () => void
}

export const ICON_TYPE = {
  LIST: 'list',
  TASK_AND_MODAL: 'Task and modal',
} as const

type ICON_TYPE = typeof ICON_TYPE[keyof typeof ICON_TYPE]

export const UserAvatarIcon: FC<Props> = ({ iconType, iconImage, size, closeFunc }) => {
  if (iconType === ICON_TYPE.LIST)
    return (
      <StyledUserAvatarIconContainer>
        {closeFunc && (
          <StyledUserCloseButton onClick={closeFunc}>
            <img src="/svg/avatar-icon_close.svg" alt="バツボタン" />
          </StyledUserCloseButton>
        )}
        <StyledUserAvatarIconListContainer iconImage={iconImage} size={size} />
      </StyledUserAvatarIconContainer>
    )
  return (
    <StyledUserAvatarIconContainer>
      {closeFunc && (
        <StyledUserCloseButton onClick={closeFunc}>
          <img src="/svg/avatar-icon_close.svg" alt="バツボタン" />
        </StyledUserCloseButton>
      )}
      <StyledUserAvatarIconTaskAndListContainer iconImage={iconImage} size={size} />
    </StyledUserAvatarIconContainer>
  )
}
const StyledUserAvatarIconContainer = styled.div`
  position: relative;
`
const StyledUserCloseButton = styled.button`
  position: absolute;
  width: ${calculateMinSizeBasedOnFigma(14)};
  height: ${calculateMinSizeBasedOnFigma(14)};
  top: -4px;
  right: -4px;

  img {
    display: block;
    width: ${calculateMinSizeBasedOnFigma(14)};
    height: ${calculateMinSizeBasedOnFigma(14)};
    object-fit: contain;
  }
`
const StyledUserAvatarIconListContainer = styled.div<{
  iconImage: string
  size: number | `${number}px`
}>`
  width: ${({ size }) => calculateVhBasedOnFigma(size)};
  height: ${({ size }) => calculateVhBasedOnFigma(size)};
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT2};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: url(${({ iconImage }) => iconImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
const StyledUserAvatarIconTaskAndListContainer = styled.div<{
  iconImage: string
  size: number | `${number}px`
}>`
  width: ${({ size }) => calculateVhBasedOnFigma(size)};
  height: ${({ size }) => calculateVhBasedOnFigma(size)};
  border-radius: 2px;
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  background: url(${({ iconImage }) => iconImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
