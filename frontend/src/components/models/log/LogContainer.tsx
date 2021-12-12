import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { GameLogType } from 'types/gameLog'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { GAME_LOG_TYPE } from 'consts/gameLog'

type Props = {
  gameLogs: GameLogType[]
}

export const LogContainer: FCX<Props> = ({ className, gameLogs }) => {
  const endText = (context: string) => {
    if (context.includes(GAME_LOG_TYPE.CREATE_PROJECT)) {
      return 'が出現した！'
    } else if (context.includes(GAME_LOG_TYPE.COMPLETE_PROJECT)) {
      return 'が完了した！'
    } else if (context.includes(GAME_LOG_TYPE.ONLINE)) {
      return 'になりました'
    } else if (context.includes(GAME_LOG_TYPE.OFFLINE)) {
      return 'になりました'
    } else if (context.includes(GAME_LOG_TYPE.CREATE_FIRST_TASK)) {
      return 'が出現した！'
    } else if (context.includes(GAME_LOG_TYPE.CREATE_TASK)) {
      return 'を作成した'
    } else if (context.includes(GAME_LOG_TYPE.CREATE_LIST)) {
      return 'を作成した'
    } else if (context.includes(GAME_LOG_TYPE.COMPLETE_TASK)) {
      return 'を与えた'
    } else {
      return 'が上がった！'
    }
  }

  const isUserName = (context: string) => {
    return (
      !context.includes(GAME_LOG_TYPE.CREATE_PROJECT) &&
      !context.includes(GAME_LOG_TYPE.COMPLETE_PROJECT) &&
      !context.includes(GAME_LOG_TYPE.CREATE_FIRST_TASK)
    )
  }

  const caseParticle = (context: string) => {
    return context.includes(GAME_LOG_TYPE.LEVEL_UP) ? 'の' : 'が'
  }

  return (
    <StyledContainer className={className}>
      <h4>
        <img src="/svg/game-log.svg" alt="GAME LOG" />
      </h4>
      <StyledLogTextContainer>
        {gameLogs.map((gameLog, index) => (
          <StyledLogText key={index}>
            {isUserName(gameLog.context) && (
              <>
                <StyledLogUserName>{gameLog.userName}</StyledLogUserName>
                {caseParticle(gameLog.context)}
              </>
            )}
            <StyledLogSpanColor gameLogText={gameLog.context}>{gameLog.context}</StyledLogSpanColor>
            {endText(gameLog.context)}
          </StyledLogText>
        ))}
      </StyledLogTextContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaHeight(278)};
  height: ${calculateMinSizeBasedOnFigmaHeight(343.66)};
  background: url('/svg/game-log_background.svg');
  background-repeat: no-repeat;
  background-size: contain;
  h4 {
    margin: ${calculateMinSizeBasedOnFigmaHeight(31)} 0 ${calculateMinSizeBasedOnFigmaHeight(18)};
    text-align: center;
    img {
      width: ${calculateMinSizeBasedOnFigmaHeight(150)};
    }
  }
`
const StyledLogTextContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: ${calculateMinSizeBasedOnFigmaHeight(195)};
  height: ${calculateMinSizeBasedOnFigmaHeight(216)};
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaHeight(2)} 0;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.COLORS.AKAROA};
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.RODEO_DUST};
    border-radius: 100px;
  }
`
const StyledLogText = styled.p`
  font-size: ${calculateMinSizeBasedOnFigmaHeight(12)};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.SPICY_MIX};
  letter-spacing: 0;
`
const StyledLogUserName = styled.span`
  color: ${({ theme }) => theme.COLORS.SHIP_COVE};
`
const StyledLogSpanColor = styled.span<{ gameLogText: string }>`
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.CREATE_PROJECT) &&
    css`
      color: ${theme.COLORS.ERROR};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.COMPLETE_PROJECT) &&
    css`
      color: ${theme.COLORS.GREEN};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.ONLINE) &&
    css`
      color: ${theme.COLORS.GREEN};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.OFFLINE) &&
    css`
      color: ${theme.COLORS.ERROR};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.CREATE_FIRST_TASK) &&
    css`
      color: ${theme.COLORS.ERROR};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.CREATE_TASK) &&
    css`
      color: ${theme.COLORS.GREEN};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.CREATE_LIST) &&
    css`
      color: ${theme.COLORS.GREEN};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.COMPLETE_TASK) &&
    css`
      color: ${theme.COLORS.ERROR};
    `}
  `}
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.LEVEL_UP) &&
    css`
      color: ${theme.COLORS.GREEN};
    `}
  `}
  padding: 0 ${calculateMinSizeBasedOnFigmaHeight(3)};
`
