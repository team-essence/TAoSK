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
import styled, { css } from 'styled-components'

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

// const StyledUserInfoWrapper = styled.div`
//   padding: 6px 0;
//   background: ${({ theme }) => convertIntoRGBA(theme.COLORS.COD_GRAY, 0.11)};
//   width: ${calculateMinSizeBasedOnFigmaWidth(426)};
// `

// const StyledParameterContainer = styled(StyledUserInfoWrapper)`
//   padding: ${calculateMinSizeBasedOnFigmaWidth(17)} 0;
//   display: flex;
//   flex-direction: column;
//   gap: ${calculateMinSizeBasedOnFigmaWidth(16)} 0;
// `

// const StyledStatusBarContainer = styled.div`
//   margin: 0 auto;
//   position: relative;
//   display: flex;
//   align-items: center;
//   gap: 0 ${calculateMinSizeBasedOnFigmaWidth(9)};
//   width: fit-content;

//   h5 {
//     color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
//     font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
//     font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BLACK};
//   }

//   p {
//     font-family: 'Yanone Kaffeesatz', 'Inter', 'BlinkMacSystemFont', 'Hiragino Kaku Gothic ProN',
//       'Hiragino Sans', Meiryo, sans-serif;
//     position: absolute;
//     right: 0;
//     ${({ theme }) => css`
//       width: ${calculateMinSizeBasedOnFigmaWidth(58)};
//       text-align: center;
//       z-index: ${theme.Z_INDEX.INDEX_2};
//       font-size: ${theme.FONT_SIZES.SIZE_18};
//       color: ${theme.COLORS.WHITE};
//       font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
//       background: linear-gradient(
//         0deg,
//         ${theme.COLORS.MINE_SHAFT},
//         ${theme.COLORS.MINE_SHAFT} 100%
//       );
//       background-size: 200% 200%;
//       -webkit-background-clip: text;
//       -webkit-text-stroke: 4px transparent;
//     `}
//   }
// `

// const StyledBar = styled.div`
//   position: relative;
//   width: ${calculateMinSizeBasedOnFigmaWidth(150)};
//   height: ${calculateMinSizeBasedOnFigmaWidth(13)};
// `

// const StyledHpBar = styled(StyledBar)<{ rate: number }>`
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
//     height: 100%;
//     background: ${({ theme }) => theme.COLORS.HP_BG};
//     border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
//     z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     width: ${({ rate }) => rate}%;
//     height: 100%;
//     background: ${({ theme }) => theme.COLORS.HP};
//     border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
//   }
// `

// const StyledMpBar = styled(StyledBar)<{ rate: number }>`
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
//     height: 100%;
//     background: ${({ theme }) => theme.COLORS.MP_BG};
//     border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
//     z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     width: ${({ rate }) => rate}%;
//     height: 100%;
//     background: ${({ theme }) => theme.COLORS.MP};
//     border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
//   }
// `
