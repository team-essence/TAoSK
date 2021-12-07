import React, { FC } from 'react'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  className?: string
  handlers:
    | boolean
    | {
        onMouseOver(): void
        onMouseOut(): void
      }
  iconImage: string
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const UserMenuHeader: FC<Props> = ({ className, handlers, iconImage, onClick }) => {
  return (
    <StyledUserMenuHeaderContainer {...handlers} onClick={onClick} className={className}>
      <StyledUserMenuIcon>
        <img src={iconImage} alt="ユーザアイコン" />
      </StyledUserMenuIcon>

      <img src="/svg/menu-arrow_bottom.svg" alt="メニュー表示" />
    </StyledUserMenuHeaderContainer>
  )
}

const StyledUserMenuHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
  cursor: pointer;
`

const StyledUserMenuIcon = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(32)};
  height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(32)};
    height: fit-content;
    border-radius: 50%;
    object-fit: cover;
  }
`
