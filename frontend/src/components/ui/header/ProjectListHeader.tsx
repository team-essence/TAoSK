import React, { FC } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateMinSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateMinSizeBasedOnFigmaHeight'

type Props = {}

export const ProjectListHeader: FC = () => {
  return (
    <StyledHeaderWrapper>
      <StyledLogoWrapper>
        <StyledLogo src="/svg/logo-transparent-background.svg" alt="ロゴ" />
      </StyledLogoWrapper>

      <StyledBellWrapper>
        <img src="/svg/bell.svg" alt="通知アイコン" />
        {true && <StyledNotificationIcon />}
      </StyledBellWrapper>

      <StyledUserMenuIconWrapper>
        <StyledUserMenuIcon>
          <img
            src="https://akiba-souken.k-img.com/assets/images/article/000/928/t640_928199.jpg"
            alt="ユーザアイコン"
          />
        </StyledUserMenuIcon>

        <img src="/svg/menu-arrow_bottom.svg" alt="メニュー表示" />
      </StyledUserMenuIconWrapper>
    </StyledHeaderWrapper>
  )
}

const StyledHeaderWrapper = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.HEADER};
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${calculateMinSizeBasedOnFigma(28)};
  width: 100vw;
  height: ${({ theme }) => theme.HEADER_HEIGHT};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
`

const StyledLogoWrapper = styled.div`
  object-fit: contain;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(43)};
`

const StyledLogo = styled.img`
  height: ${calculateMinSizeBasedOnFigma(43)};
`

const StyledBellWrapper = styled.div`
  margin-right: ${calculateMinSizeBasedOnFigma(16)};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledNotificationIcon = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaHeight(-2)};
  right: ${calculateMinSizeBasedOnFigma(1)};
  width: 9px;
  height: 9px;
  background: ${({ theme }) => theme.COLORS.DODGER_BLUE};
  border: solid 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border-radius: 50%;
`

const StyledUserMenuIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigma(4)};
  cursor: pointer;
`

const StyledUserMenuIcon = styled.div`
  width: ${calculateMinSizeBasedOnFigma(32)};
  height: ${calculateMinSizeBasedOnFigma(32)};
  border-radius: 50%;

  img {
    width: ${calculateMinSizeBasedOnFigma(32)};
    height: ${calculateMinSizeBasedOnFigma(32)};
    border-radius: 50%;
    object-fit: cover;
  }
`
