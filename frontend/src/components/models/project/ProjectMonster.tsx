import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  className?: string
  name: string
  hpRemaining: number
  hp: number
}

export const ProjectMonster: FC<Props> = ({ className, name, hp, hpRemaining }) => {
  return (
    <StyledProjectMonster className={className}>
      <StyledMonsterStatus>
        <StyledMonsterHeadImg src="/svg/dragon-head_1.svg" alt="モンスターの頭" />

        <StyledMonsterName>{name}</StyledMonsterName>

        <StyledStatusBarContainer>
          <h5>HP</h5>
          <p>
            {hpRemaining}/{hp}
          </p>
          <StyledHpBar rate={hpRemaining} max={hp} />
        </StyledStatusBarContainer>

        <StyledMonsterStatusBackgroundImg
          src="/svg/monster-status_background.svg"
          alt="モンスターステータスの背景画像"
        />
      </StyledMonsterStatus>

      <StyledProjectMonsterImg src="/monster.png" />
    </StyledProjectMonster>
  )
}

const StyledProjectMonster = styled.div``

const StyledMonsterStatus = styled.div`
  position: relative;
`

const StyledMonsterStatusBackgroundImg = styled.img`
  width: ${calculateMinSizeBasedOnFigma(295)};
`

const StyledMonsterHeadImg = styled.img`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigma(17)};
  left: ${calculateMinSizeBasedOnFigma(22)};
  width: ${calculateMinSizeBasedOnFigma(41)};
`

const StyledMonsterName = styled.h5`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigma(10)};
  left: ${calculateMinSizeBasedOnFigma(88)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
  color: ${({ theme }) => theme.COLORS.WHITE};
`

const StyledProjectMonsterImg = styled.img`
  margin: 0 auto;
  display: block;
  width: ${calculateMinSizeBasedOnFigma(220)};
`

const StyledStatusBarContainer = styled.div`
  position: absolute;
  left: ${calculateMinSizeBasedOnFigma(82)};
  bottom: ${calculateMinSizeBasedOnFigma(19)};
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigma(8)};

  font-family: 'Yanone Kaffeesatz', 'Inter', 'BlinkMacSystemFont', 'Hiragino Kaku Gothic ProN',
    'Hiragino Sans', Meiryo, sans-serif;

  h5 {
    position: relative;
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
    height: fit-content;
    /* line-height: ${({ theme }) => theme.FONT_SIZES.SIZE_24}; */
  }

  p {
    padding-left: 1px;
    position: absolute;
    right: ${calculateMinSizeBasedOnFigma(-10)};
    bottom: ${calculateMinSizeBasedOnFigma(2)};

    ${({ theme }) => css`
      width: ${calculateMinSizeBasedOnFigma(68)};
      text-align: center;
      z-index: ${theme.Z_INDEX.INDEX_2};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      color: ${theme.COLORS.WHITE};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      background: ${theme.COLORS.BLACK};
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-stroke: 1px transparent;
      z-index: ${theme.Z_INDEX.INDEX_3};
    `}
  }
`

const StyledBar = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigma(170)};
  height: ${calculateMinSizeBasedOnFigma(12)};
`

const StyledHpBar = styled(StyledBar)<{ rate: number; max: number }>`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% + ${calculateMinSizeBasedOnFigma(4)});
    height: 100%;
    background: ${({ theme }) => theme.COLORS.MONSTER_HP_BG};
    border-radius: ${calculateMinSizeBasedOnFigma(100)};
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${({ rate, max }) => (rate / max) * 100}%;
    height: 100%;
    background: ${({ theme }) => theme.COLORS.MONSTER_HP};
    border-radius: ${calculateMinSizeBasedOnFigma(100)};
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
  }
`
