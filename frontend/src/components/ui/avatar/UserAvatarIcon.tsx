import React, { FC } from 'react'
import styled from 'styled-components'
import { useHover } from 'hooks/useHover'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import { calculateVhBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  avatarStyleType: AVATAR_STYLE
  iconImage: string
  name?: string
  occupation?: string
  className?: string
  btnFunc?: () => void
}

export const UserAvatarIcon: FC<Props> = ({
  avatarStyleType,
  iconImage,
  btnFunc,
  name,
  occupation,
  className,
}) => {
  const [hovered, eventHoverHandlers] = useHover()

  if (avatarStyleType === AVATAR_STYLE.LIST)
    return (
      <StyledUserAvatarIconContainer size={50} {...eventHoverHandlers} className={className}>
        <StyledUserAvatarListIcon iconImage={iconImage} size={50} />

        {hovered && (
          <StyledPopupUserInfoContainer bottom={66}>
            <StyledPopupUserIconContainer>
              <img src={iconImage} />
            </StyledPopupUserIconContainer>

            <StyledPopupUserContainer>
              <StyledPopupUserName>{name}</StyledPopupUserName>
              <StyledPopupUserOccupation>{occupation}</StyledPopupUserOccupation>
            </StyledPopupUserContainer>
          </StyledPopupUserInfoContainer>
        )}
      </StyledUserAvatarIconContainer>
    )
  else if (avatarStyleType === AVATAR_STYLE.TASK)
    return (
      <StyledUserAvatarIconContainer size={24} className={className}>
        <StyledUserAvatarTaskIcon iconImage={iconImage} size={24} />
      </StyledUserAvatarIconContainer>
    )
  else
    return (
      <StyledUserAvatarIconContainer size={40} {...eventHoverHandlers} className={className}>
        {btnFunc && (
          <StyledUserCloseButton onClick={btnFunc}>
            <img src="/svg/avatar-icon_close.svg" alt="バツボタン" />
          </StyledUserCloseButton>
        )}
        <StyledUserAvatarTaskIcon iconImage={iconImage} size={40} />

        {hovered && (
          <StyledPopupUserInfoContainer bottom={66}>
            <StyledPopupUserIconContainer>
              <img src={iconImage} />
            </StyledPopupUserIconContainer>

            <StyledPopupUserContainer>
              <StyledPopupUserName>{name}</StyledPopupUserName>
              <StyledPopupUserOccupation>{occupation}</StyledPopupUserOccupation>
            </StyledPopupUserContainer>
          </StyledPopupUserInfoContainer>
        )}
      </StyledUserAvatarIconContainer>
    )
}

const StyledUserAvatarIconContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => calculateVhBasedOnFigma(size)};
  height: ${({ size }) => calculateVhBasedOnFigma(size)};
`

const StyledUserCloseButton = styled.button`
  position: absolute;
  width: ${calculateMinSizeBasedOnFigmaWidth(14)};
  height: ${calculateMinSizeBasedOnFigmaWidth(14)};
  top: -4px;
  right: -4px;

  img {
    display: block;
    width: ${calculateMinSizeBasedOnFigmaWidth(14)};
    height: ${calculateMinSizeBasedOnFigmaWidth(14)};
    object-fit: contain;
  }
`

const StyledUserAvatarListIcon = styled.div<{
  iconImage: string
  size: number
}>`
  width: ${({ size }) => calculateVhBasedOnFigma(size)};
  height: ${({ size }) => calculateVhBasedOnFigma(size)};
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: url(${({ iconImage }) => iconImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const StyledUserAvatarTaskIcon = styled.div<{
  iconImage: string
  size: number
}>`
  width: ${({ size }) => calculateMinSizeBasedOnFigmaHeight(size)};
  height: ${({ size }) => calculateMinSizeBasedOnFigmaHeight(size)};
  border-radius: 2px;
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  background: url(${({ iconImage }) => iconImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const StyledPopupUserInfoContainer = styled.div<{ bottom: number }>`
  z-index: ${({ theme }) => theme.Z_INDEX.POPOVER};
  position: absolute;
  bottom: ${({ bottom }) => calculateVhBasedOnFigma(-bottom)};
  left: -20%;
  width: ${calculateVhBasedOnFigma(240)};
  height: ${calculateVhBasedOnFigma(60)};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: ${({ theme }) => convertIntoRGBA(theme.COLORS.MINE_SHAFT, 0.9)};
  border-radius: 4px;
  display: flex;
  gap: 0px 4px;
  align-items: center;
`

const StyledPopupUserContainer = styled.div``

const StyledPopupUserName = styled.p`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${calculateVhBasedOnFigma(16)};
`

const StyledPopupUserOccupation = styled.p`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${calculateVhBasedOnFigma(12)};
`

const StyledPopupUserIconContainer = styled.div`
  margin: 0;
  position: relative;
  left: -2px;
  width: ${calculateVhBasedOnFigma(60)};
  height: ${calculateVhBasedOnFigma(60)};

  img {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
    border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
    border-radius: 4px;
    width: ${calculateVhBasedOnFigma(60)};
    height: ${calculateVhBasedOnFigma(60)};
    object-fit: cover;
  }
`
