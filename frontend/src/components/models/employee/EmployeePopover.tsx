import React, { FC } from 'react'
import { GetUserQuery } from 'pages/mypage/mypage.gen'
import { occupationList } from 'consts/occupationList'
import { PopoverProps } from 'types/popover'
import { Params } from 'types/status'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { BasicPopover } from 'components/ui/modal/BasicPopover'
import { EmployeeStatus } from 'components/models/employee/EmployeeStatus'
import { Avatar } from 'components/ui/item/Avatar'
import { Level } from 'components/ui/item/Level'
import { Occupation } from 'components/ui/item/Occupation'
import { Tag } from 'components/ui/tag/Tag'
import styled from 'styled-components'

type Props = {
  className?: string
  level: number
} & PopoverProps &
  Omit<GetUserQuery['user'], 'company' | 'memo' | 'exp' | 'online_flg'>

export const EmployeePopover: FC<Props> = ({
  id,
  occupation_id,
  name,
  hp,
  mp,
  level,
  icon_image,
  anchorEl,
  vertical,
  horizontal,
  handleClose,
  technology,
  achievement,
  motivation,
  solution,
  plan,
  design,
  interests,
  certifications,
}) => {
  const params: Params[] = [
    { param: 'technology', value: technology },
    { param: 'achievement', value: achievement },
    { param: 'solution', value: solution },
    { param: 'motivation', value: motivation },
    { param: 'design', value: design },
    { param: 'plan', value: plan },
  ]
  const paramsSortedIntoThreeMaxValues = params
    .sort((prev, current) => (prev.value < current.value ? 1 : -1))
    .slice(0, 3)

  return (
    <BasicPopover
      anchorEl={anchorEl}
      vertical={vertical}
      horizontal={horizontal}
      handleClose={handleClose}>
      <StyledContainer>
        <StyledUpperRowContainer>
          <StyledFlexCotaniner>
            <Avatar image={icon_image} size="normal" />
            <div>
              <StyledFlexCotaniner>
                <Level size="normal" level={level} />
                <Occupation size="normal" occupation={occupationList[occupation_id - 1]} />
              </StyledFlexCotaniner>
              <div>HP,MP</div>
            </div>
          </StyledFlexCotaniner>
          <StyledName>{name}</StyledName>
          <StyledId>{`#${id}`}</StyledId>
        </StyledUpperRowContainer>
        <StyledBorder />
        <StyledLowerRow>
          <div>
            <StyledH4>ステータス</StyledH4>
            <StyledBorder />
            <StyledEmployeeStatus>
              {paramsSortedIntoThreeMaxValues.map((item, index) => (
                <EmployeeStatus key={index} {...item} />
              ))}
            </StyledEmployeeStatus>
          </div>
          <div>
            <StyledH4>興味のあること</StyledH4>
            <StyledBorder />
            <StyledTagContainer>
              {interests.map((item, index) => (
                <Tag key={index} name={item.context} tagType="small" />
              ))}
            </StyledTagContainer>
          </div>
          <div>
            <StyledH4>資格</StyledH4>
            <StyledBorder />
            <StyledTagContainer>
              {certifications.map((item, index) => (
                <Tag key={index} name={item.name} tagType="small" />
              ))}
            </StyledTagContainer>
          </div>
        </StyledLowerRow>
      </StyledContainer>
    </BasicPopover>
  )
}

const StyledContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(320)};
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border-radius: 4px;
`
const StyledUpperRowContainer = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(16)};
`
const StyledFlexCotaniner = styled.div`
  display: flex;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
`
const StyledName = styled.h5`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledId = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.NORMAL};
  color: ${({ theme }) => theme.COLORS.SILVER};
`
const StyledLowerRow = styled.div`
  width: 100%;
  max-height: ${calculateMinSizeBasedOnFigmaWidth(320)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(16)};
  overflow-x: hidden;
  overflow-y: auto;
`
const StyledH4 = styled.h4`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledBorder = styled.div`
  border: 1px solid ${convertIntoRGBA(theme.COLORS.BRANDY, 0.6)};
  border-radius: 4px;
`
const StyledMarginVertical = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(8)} 0;
`
const StyledEmployeeStatus = styled(StyledMarginVertical)`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
  justify-content: space-between;
`
const StyledTagContainer = styled(StyledMarginVertical)`
  display: flex;
  flex-wrap: wrap;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
`
