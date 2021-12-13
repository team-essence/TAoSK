import React, { FCX } from 'react'
import { occupationList } from 'consts/occupationList'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import exp from 'utils/exp/exp'
import { ProjectMyBars } from './ProjectMyBars'
import { ProjectMyStatuses } from './ProjectMyStatuses'

type Props = {
  iconImage: string
  occupation: string
  name: string
  totalExp: number
  hp: number
  mp: number
  technology: number
  solution: number
  achievement: number
  motivation: number
  design: number
  plan: number
}

export const ProjectMyInfo: FCX<Props> = ({
  className,
  iconImage,
  occupation,
  name,
  totalExp,
  hp,
  mp,
  technology,
  solution,
  achievement,
  motivation,
  design,
  plan,
}) => {
  return (
    <StyledProjectMyInfoContainer className={className}>
      <StyledProjectMyCardContainer>
        <StyledUserIconImgContainer>
          <img src={iconImage} alt={name} />
        </StyledUserIconImgContainer>

        <StyledUserOccupationContainer>
          <p>{occupation}</p>
          <img src="/svg/user-name_background.svg" alt="ユーザ名の背景画像" />
        </StyledUserOccupationContainer>

        <StyledUserContainer>
          <h6>{name}</h6>

          <StyledLevelContainer>
            <p>lv.{exp.toLevel(totalExp)}</p>
          </StyledLevelContainer>
        </StyledUserContainer>

        <ProjectMyBars hp={hp} mp={mp} totalExp={totalExp} />

        <StyledProjectMyInfoBackground
          src="/svg/project-detail-my-info_background.svg"
          alt="自分の情報の背景画像"
        />
      </StyledProjectMyCardContainer>

      <ProjectMyStatuses
        technology={technology}
        solution={solution}
        achievement={achievement}
        motivation={motivation}
        design={design}
        plan={plan}
      />
    </StyledProjectMyInfoContainer>
  )
}

const StyledProjectMyInfoContainer = styled.div`
  position: fixed;
  bottom: ${calculateMinSizeBasedOnFigmaWidth(8)};
  left: ${calculateMinSizeBasedOnFigmaWidth(8)};
  display: flex;
  align-items: flex-end;
`

const StyledProjectMyCardContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(436)};
  height: ${calculateMinSizeBasedOnFigmaWidth(110)};
`

const StyledUserIconImgContainer = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(1)};
  left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  width: ${calculateMinSizeBasedOnFigmaWidth(102)};
  height: ${calculateMinSizeBasedOnFigmaWidth(102)};

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(102)};
    height: ${calculateMinSizeBasedOnFigmaWidth(102)};
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
    object-fit: cover;
    border: solid ${calculateMinSizeBasedOnFigmaWidth(2)} ${({ theme }) => theme.COLORS.ZINNWALDITE};
  }
`

const StyledUserOccupationContainer = styled.div`
  position: absolute;
  left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  bottom: ${calculateMinSizeBasedOnFigmaWidth(7)};
  width: ${calculateMinSizeBasedOnFigmaWidth(102)};
  height: ${calculateMinSizeBasedOnFigmaWidth(24)};

  p {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.WHITE};
  }

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(102)};
    height: ${calculateMinSizeBasedOnFigmaWidth(24)};
    object-fit: cover;
  }
`

const StyledUserContainer = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(14)};
  left: ${calculateMinSizeBasedOnFigmaWidth(130)};
  width: ${calculateMinSizeBasedOnFigmaWidth(290)};
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;

  h6 {
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_20};
    color: ${({ theme }) => theme.COLORS.WHITE};
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const StyledLevelContainer = styled.div`
  position: relative;
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
  width: fit-content;
  height: ${calculateMinSizeBasedOnFigmaWidth(28)};
  display: flex;
  align-items: center;

  &::before {
    position: absolute;
    content: '';
    width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
    height: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
    top: 0;
    top: ${calculateMinSizeBasedOnFigmaWidth(-2)};
    left: ${calculateMinSizeBasedOnFigmaWidth(-2)};
    background: linear-gradient(to bottom, #eac4a6 0%, #d7cbc1 60%, #eac4a6 100%);
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
    border-radius: 4px;
  }

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    background: ${({ theme }) => theme.COLORS.MATTERHORN};
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
    border-radius: 4px;
  }

  p {
    margin: 0 ${calculateMinSizeBasedOnFigmaWidth(6)};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BLACK};
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`

const StyledProjectMyInfoBackground = styled.img`
  width: ${calculateMinSizeBasedOnFigmaWidth(436)};
  height: ${calculateMinSizeBasedOnFigmaWidth(110)};
  object-fit: contain;
`
