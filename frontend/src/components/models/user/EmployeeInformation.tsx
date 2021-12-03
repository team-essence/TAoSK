import React, { FC } from 'react'
import { DEFAUT_USER } from 'consts/defaultImages'
import { GetUserQuery } from 'pages/mypage/mypage.gen'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import Exp from 'utils/exp/exp'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
} & Omit<GetUserQuery['user'], 'company' | 'memo'>

export const EmployeeInformation: FC<Props> = ({ name, icon_image, hp, mp, exp, online_flg }) => {
  const level = Exp.toLevel(exp) !== 0 ? Exp.toLevel(exp) : 1

  return (
    <StyledContainer onlineFlg={online_flg}>
      <StyledImage src={icon_image ? icon_image : DEFAUT_USER} alt="employeeImage" />
      <StyledColumnContainer>
        <StyledLowContainer>
          <StyledName>{name}</StyledName>
          <StyledLevel>{`lv.${level}`}</StyledLevel>
        </StyledLowContainer>
        <StyledLowContainer>
          <StyledHpBar rate={hp} onlineFlg={online_flg} />
          <StyledMpBar rate={mp} onlineFlg={online_flg} />
        </StyledLowContainer>
      </StyledColumnContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div<{ onlineFlg: boolean }>`
  display: flex;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigmaWidth(4)};
  ${({ onlineFlg }) =>
    onlineFlg
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.6;
        `}
  opacity: 0.7;
`
const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaWidth(2)};
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};
`
const StyledLowContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  gap: ${calculateMinSizeBasedOnFigmaWidth(6)};
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  padding: ${calculateMinSizeBasedOnFigmaWidth(2)} ${calculateMinSizeBasedOnFigmaWidth(4)};
`
const StyledImage = styled.img`
  width: ${calculateMinSizeBasedOnFigmaWidth(41)};
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledName = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`
const StyledLevel = styled.div`
  min-width: ${calculateMinSizeBasedOnFigmaWidth(32)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_10};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
  background-color: ${({ theme }) => theme.COLORS.MATTERHORN};
`
const StyledBar = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(64)};
  height: ${calculateMinSizeBasedOnFigmaWidth(6)};
`
const StyledHpBar = styled(StyledBar)<{ rate: number; onlineFlg: boolean }>`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${calculateMinSizeBasedOnFigmaWidth(-1.5)};
    width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(1.5)});
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    ${({ onlineFlg }) =>
      onlineFlg
        ? css`
            background: ${({ theme }) => theme.COLORS.HP_BG};
          `
        : css`
            background: ${({ theme }) => theme.COLORS.SILVER};
          `}
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${({ rate }) => rate}%;
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    ${({ onlineFlg }) =>
      onlineFlg
        ? css`
            background: ${({ theme }) => theme.COLORS.HP};
          `
        : css`
            background: ${({ theme }) => theme.COLORS.SILVER};
          `}
  }
`
const StyledMpBar = styled(StyledBar)<{ rate: number; onlineFlg: boolean }>`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${calculateMinSizeBasedOnFigmaWidth(-1.5)};
    width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(1.5)});
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    ${({ onlineFlg }) =>
      onlineFlg
        ? css`
            background: ${({ theme }) => theme.COLORS.MP_BG};
          `
        : css`
            background: ${({ theme }) => theme.COLORS.SILVER};
          `}
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${({ rate }) => rate}%;
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    ${({ onlineFlg }) =>
      onlineFlg
        ? css`
            background: ${({ theme }) => theme.COLORS.MP};
          `
        : css`
            background: ${({ theme }) => theme.COLORS.SILVER};
          `}
  }
`
