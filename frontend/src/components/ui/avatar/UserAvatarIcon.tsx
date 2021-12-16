import React, { FCX } from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { HoverTriggerPopover } from 'components/ui/popup/HoverTriggerPopover'
import { usePopover } from 'hooks/usePopover'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { AVATAR_STYLE } from 'consts/avatarStyle'

type Props = {
  avatarStyleType: AVATAR_STYLE
  iconImage: string
  name?: string
  occupation?: string
  onClickDeleteBtn?: () => void
}

export const UserAvatarIcon: FCX<Props> = ({
  avatarStyleType,
  iconImage,
  onClickDeleteBtn,
  name,
  occupation,
  className,
}) => {
  const { anchorEl, openPopover, closePopover } = usePopover()

  if (avatarStyleType === AVATAR_STYLE.LIST)
    return (
      <StyledUserAvatarIconListContainer onMouseEnter={openPopover} className={className}>
        <StyledUserAvatarListIcon iconImage={iconImage} />

        <HoverTriggerPopover
          anchorEl={anchorEl}
          handleClose={closePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          <StyledDummyListIcon onMouseLeave={closePopover} />
          <StyledPopupUserInfoContainer>
            <StyledPopupUserIconContainer>
              <img src={iconImage} />
            </StyledPopupUserIconContainer>

            <StyledPopupUserContainer>
              <StyledPopupUserName>{name}</StyledPopupUserName>
              <StyledPopupUserOccupation>{occupation}</StyledPopupUserOccupation>
            </StyledPopupUserContainer>
          </StyledPopupUserInfoContainer>
        </HoverTriggerPopover>
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
      <StyledUserAvatarIconModalContainer onMouseEnter={openPopover} className={className}>
        {onClickDeleteBtn && (
          <StyledUserCloseButton onClick={onClickDeleteBtn}>
            <img src="/svg/avatar-icon_close.svg" alt="バツボタン" />
          </StyledUserCloseButton>
        )}
        <StyledUserAvatarModalIcon iconImage={iconImage} />

        <HoverTriggerPopover
          anchorEl={anchorEl}
          handleClose={closePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          <StyledDummyModalIcon onMouseLeave={closePopover} />
          <StyledPopupUserInfoContainer>
            <StyledPopupUserIconContainer>
              <img src={iconImage} />
            </StyledPopupUserIconContainer>

            <StyledPopupUserContainer>
              <StyledPopupUserName>{name}</StyledPopupUserName>
              <StyledPopupUserOccupation>{occupation}</StyledPopupUserOccupation>
            </StyledPopupUserContainer>
          </StyledPopupUserInfoContainer>
        </HoverTriggerPopover>
      </StyledUserAvatarIconModalContainer>
    )
}

const listContainerAspectCss = css`
  width: ${calculateMinSizeBasedOnFigma(50)};
  height: ${calculateMinSizeBasedOnFigma(50)};
`
const taskContainerAspectCss = css`
  width: ${calculateMinSizeBasedOnFigma(24)};
  height: ${calculateMinSizeBasedOnFigma(24)};
`
const modalContainerAspectCss = css`
  width: ${calculateMinSizeBasedOnFigma(40)};
  height: ${calculateMinSizeBasedOnFigma(40)};
`
const getStyleIconContainer = (css: FlattenSimpleInterpolation) => styled.div`
  position: relative;
  ${css}
`
const getStyleDummyIcon = (css: FlattenSimpleInterpolation) => styled.div`
  position: relative;
  bottom: 100%;
  left: 0;
  ${css}
`
const StyledUserAvatarIconListContainer = getStyleIconContainer(listContainerAspectCss)
const StyledUserAvatarIconTaskContainer = getStyleIconContainer(taskContainerAspectCss)
const StyledUserAvatarIconModalContainer = getStyleIconContainer(modalContainerAspectCss)
const StyledDummyListIcon = getStyleDummyIcon(css`
  /* バツボタンが押せなくならないようにmargin-topを付与 */
  margin-top: ${calculateMinSizeBasedOnFigma(10)};
  width: ${calculateMinSizeBasedOnFigma(50)};
  height: ${calculateMinSizeBasedOnFigma(40)};
`)
const StyledDummyModalIcon = getStyleDummyIcon(css`
  /* バツボタンが押せなくならないようにmargin-topを付与 */
  margin-top: ${calculateMinSizeBasedOnFigma(10)};
  width: ${calculateMinSizeBasedOnFigma(40)};
  height: ${calculateMinSizeBasedOnFigma(30)};
`)

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

const StyledPopupUserInfoContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigma(240)};
  height: ${calculateMinSizeBasedOnFigma(60)};
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
  font-size: ${calculateMinSizeBasedOnFigma(16)};
`

const StyledPopupUserOccupation = styled.p`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${calculateMinSizeBasedOnFigma(12)};
`

const StyledPopupUserIconContainer = styled.div`
  margin: 0;
  position: relative;
  left: -2px;
  width: ${calculateMinSizeBasedOnFigma(60)};
  height: ${calculateMinSizeBasedOnFigma(60)};

  img {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
    border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
    border-radius: 4px;
    width: ${calculateMinSizeBasedOnFigma(60)};
    height: ${calculateMinSizeBasedOnFigma(60)};
    object-fit: cover;
  }
`
