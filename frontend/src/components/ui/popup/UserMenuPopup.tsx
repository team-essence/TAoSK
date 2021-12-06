import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { CoverPopup, POPUP_TYPE } from 'components/ui/popup/CoverPopup'
import { Link } from 'react-router-dom'
import { useTrySignOut } from 'hooks/useTrySignOut'
import Exp from 'utils/exp/exp'

type Props = {
  className?: string
  isHover: boolean
  isClick: boolean
  closeClick: () => void
  name: string
  uid: string
  iconImage: string
  totalExp: number
}

export const UserMenuPopup: FC<Props> = ({
  className,
  isHover,
  isClick,
  closeClick,
  name,
  uid,
  iconImage,
  totalExp,
}) => {
  const trySignOut = useTrySignOut()

  return (
    <StyledUserMenuPopupContainer
      className={className}
      title="アカウント"
      popupType={POPUP_TYPE.SMALL}
      isHover={isHover}
      isClick={isClick}
      closeClick={closeClick}>
      <StyledUserInfoContainer>
        <StyledUserIconImageContainer>
          <img src={iconImage} alt="ユーザアイコン" />
        </StyledUserIconImageContainer>

        <StyledUserInfo>
          <StyledUserNameContainer>
            <StyledUserName>{name}</StyledUserName>

            <StyledLevelContainer>
              <p>lv.{Exp.toLevel(totalExp)}</p>
            </StyledLevelContainer>
          </StyledUserNameContainer>

          <StyledUserUid>@{uid}</StyledUserUid>
        </StyledUserInfo>
      </StyledUserInfoContainer>

      <StyledAccountRelationshipContainer>
        <p>
          <Link to={'/mypage/' + uid}>マイページ</Link>
        </p>
        {/* TODO: モーダルがきたらonClickを追加 */}
        <button>アカウント設定</button>
      </StyledAccountRelationshipContainer>

      <StyledLSignOutContainer>
        <button onClick={trySignOut}>ログアウト</button>
      </StyledLSignOutContainer>
    </StyledUserMenuPopupContainer>
  )
}

const StyledUserMenuPopupContainer = styled(CoverPopup)``

const StyledUserInfoContainer = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(16)} ${calculateMinSizeBasedOnFigmaWidth(24)};
  border-bottom: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${({ theme }) => theme.COLORS.SILVER};
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(6)};
`

const StyledUserIconImageContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(40)};
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(40)};
    height: ${calculateMinSizeBasedOnFigmaWidth(40)};
    object-fit: cover;
    border-radius: 2px;
    box-shadow: 0 0 0 0.5px ${({ theme }) => theme.COLORS.BITTER_COCOA_BROWN};
    border: solid 1px ${({ theme }) => theme.COLORS.BRANDY};
  }
`

const StyledUserInfo = styled.div``

const StyledUserNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
`

const StyledUserName = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
  color: ${({ theme }) => theme.COLORS.FONT.BLACK};
  line-height: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  max-width: ${calculateMinSizeBasedOnFigmaWidth(123)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledLevelContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(45)};
  height: ${calculateMinSizeBasedOnFigmaWidth(18)};
  background: ${({ theme }) => theme.COLORS.MATTERHORN};
  border: solid 1px ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(2)};
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`

const StyledUserUid = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
  color: ${({ theme }) => theme.COLORS.DOVE_GRAY};
  max-width: ${calculateMinSizeBasedOnFigmaWidth(176)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledAccountRelationshipContainer = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(24)};
  border-bottom: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${({ theme }) => theme.COLORS.SILVER};
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)} 0;

  p {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.FONT.BLACK};
    cursor: pointer;

    a {
      display: block;
      width: 100%;
    }
  }

  button {
    display: block;
    width: 100%;
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.FONT.BLACK};
    text-align: left;
  }
`

const StyledLSignOutContainer = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(24)};

  button {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.FONT.BLACK};
    width: 100%;
    text-align: left;
  }
`
