import React, { FCX } from 'react'
import { GetUserQuery } from 'pages/mypage/mypage.gen'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { usePopover } from 'hooks/usePopover'
import { EmployeePopover } from 'components/models/employee/EmployeePopover'
import { Level } from 'components/ui/item/Level'
import { Avatar } from 'components/ui/item/Avatar'
import { StatusBar } from 'components/ui/item/StatusBar'
import Exp from 'utils/exp/exp'
import styled, { css } from 'styled-components'

type Props = Omit<GetUserQuery['user'], 'company' | 'memo' | 'invitations'>

export const EmployeeInformation: FCX<Props> = ({
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
  occupation,
}) => {
  const { anchorEl, openPopover, closePopover } = usePopover()
  const level = Exp.toLevel(exp) !== 0 ? Exp.toLevel(exp) : 1
  const popoverItem = {
    id,
    occupation,
    name,
    hp,
    mp,
    level,
    icon_image,
    interests,
    certifications,
    technology,
    achievement,
    motivation,
    solution,
    plan,
    design,
  }

  return (
    <>
      <StyledContainer onlineFlg={online_flg} onClick={openPopover}>
        <Avatar image={icon_image} size="small" />
        <StyledColumnContainer>
          <StyledLowContainer>
            <StyledName>{name}</StyledName>
            <Level level={level} size="small" />
          </StyledLowContainer>
          <StyledLowContainer>
            <StatusBar type="HP" size="small" rate={hp} onlineFlg={online_flg} />
            <StatusBar type="MP" size="small" rate={mp} onlineFlg={online_flg} />
          </StyledLowContainer>
        </StyledColumnContainer>
      </StyledContainer>
      <EmployeePopover
        anchorEl={anchorEl}
        handleClose={closePopover}
        vertical="top"
        horizontal="right"
        {...popoverItem}
      />
    </>
  )
}

const StyledContainer = styled.div<{ onlineFlg: boolean }>`
  display: flex;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigmaWidth(4)};
  cursor: pointer;
  ${({ onlineFlg }) =>
    onlineFlg
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.6;
        `}
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
const StyledName = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`
