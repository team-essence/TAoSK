import React, { FC } from 'react'
import styled, { css } from 'styled-components'
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
      <StyledUserAvatarIconListContainer {...eventHoverHandlers} className={className}>
        <StyledUserAvatarListIcon iconImage={iconImage} />

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
      </StyledUserAvatarIconListContainer>
    )
  else if (avatarStyleType === AVATAR_STYLE.TASK)
    return (
      <StyledUserAvatarIconTaskContainer className={className}>
        <StyledUserAvatarTaskIcon iconImage={iconImage} />
      </StyledUserAvatarIconTaskContainer>
    )
  else
    return (
      <StyledUserAvatarIconModalContainer {...eventHoverHandlers} className={className}>
        {btnFunc && (
          <StyledUserCloseButton onClick={btnFunc}>
            <img src="/svg/avatar-icon_close.svg" alt="バツボタン" />
          </StyledUserCloseButton>
        )}
        <StyledUserAvatarModalIcon iconImage={iconImage} />

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
      </StyledUserAvatarIconModalContainer>
    )
}

const StyledUserAvatarIconListContainer = styled.div`
  position: relative;
  width: ${calculateVhBasedOnFigma(50)};
  height: ${calculateVhBasedOnFigma(50)};
`

const StyledUserAvatarIconTaskContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaHeight(24)};
  height: ${calculateMinSizeBasedOnFigmaHeight(24)};
`

const StyledUserAvatarIconModalContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(40)};
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
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

const userAvatarIconCss = css`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const StyledUserAvatarListIcon = styled.div<{ iconImage: string }>`
  box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: url(${({ iconImage }) => iconImage});
  ${userAvatarIconCss}
`

const StyledUserAvatarTaskIcon = styled.div<{ iconImage: string }>`
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  background: url(${({ iconImage }) => iconImage});
  ${userAvatarIconCss}
`

const StyledUserAvatarModalIcon = styled.div<{ iconImage: string }>`
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  background: url(${({ iconImage }) => iconImage});
  ${userAvatarIconCss}
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
