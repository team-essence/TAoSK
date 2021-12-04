import React, { FC } from 'react'
import { DEFAUT_USER } from 'consts/defaultImages'
import { GetUserQuery } from 'pages/mypage/mypage.gen'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { usePopover } from 'hooks/usePopover'
import { EmployeePopover } from 'components/models/employee/EmployeePopover'
import { Level } from 'components/ui/item/Level'
import Exp from 'utils/exp/exp'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
} & Omit<GetUserQuery['user'], 'company' | 'memo'>

export const EmployeeInformation: FC<Props> = ({
  id,
  name,
  icon_image,
  hp,
  mp,
  exp,
  online_flg,
  technology,
  achievement,
  motivation,
  solution,
  plan,
  design,
  interests,
  certifications,
}) => {
  const { anchorEl, openPopover, closePopover } = usePopover()
  const level = Exp.toLevel(exp) !== 0 ? Exp.toLevel(exp) : 1
  const params = { technology, achievement, motivation, solution, plan, design }

  return (
    <>
      <StyledContainer onlineFlg={online_flg} onClick={openPopover}>
        <StyledImage src={icon_image ? icon_image : DEFAUT_USER} alt="employeeImage" />
        <StyledColumnContainer>
          <StyledLowContainer>
            <StyledName>{name}</StyledName>
            <Level level={level} size="small" />
            {/* <StyledLevel>{`lv.${level}`}</StyledLevel> */}
          </StyledLowContainer>
          <StyledLowContainer>
            <StyledHpBar rate={hp} onlineFlg={online_flg} />
            <StyledMpBar rate={mp} onlineFlg={online_flg} />
          </StyledLowContainer>
        </StyledColumnContainer>
      </StyledContainer>
      <EmployeePopover
        anchorEl={anchorEl}
        handleClose={closePopover}
        vertical="top"
        horizontal="right"
        id={id}
        name={name}
        icon_image={icon_image}
        interests={interests}
        certifications={certifications}
        {...params}
      />
    </>
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
  cursor:pointer;
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
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigmaWidth(41)};
  height: ${calculateMinSizeBasedOnFigmaWidth(41)};
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  object-fit: cover;
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
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    background: ${({ theme }) => theme.COLORS.SILVER};
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
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    background: ${({ theme }) => theme.COLORS.SILVER};
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
