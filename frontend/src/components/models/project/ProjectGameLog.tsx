import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { GameLogType } from 'types/gameLog'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  className?: string
  gameLogs: GameLogType[]
}

export const GAME_LOG_TYPE = {
  CREATE: '作成',
  DAMAGE: 'ダメージ',
  HP: 'HP',
} as const
type GAME_LOG_TYPE = typeof GAME_LOG_TYPE[keyof typeof GAME_LOG_TYPE]

export const ProjectGameLog: FC<Props> = ({ className, gameLogs }) => {
  const startText = (userName: string, context: string) => {
    if (context.includes(GAME_LOG_TYPE.CREATE)) {
      return `${userName}はタスクを`
    } else if (context.includes(GAME_LOG_TYPE.DAMAGE)) {
      return `${userName}は`
    } else {
      return `${userName}の`
    }
  }

  const endText = (context: string) => {
    if (context.includes(GAME_LOG_TYPE.CREATE)) {
      return 'した！'
    } else if (context.includes(GAME_LOG_TYPE.DAMAGE)) {
      return 'を与えた！'
    } else {
      return 'になった！'
    }
  }

  return (
    <StyledProjectGameLogContainer className={className}>
      <h4>
        <img src="/svg/game-log.svg" alt="GAME LOG" />
      </h4>

      <StyledProjectGameLogTextContainer>
        {gameLogs.map((gameLog, index) => (
          <StyledProjectGameLogText key={index}>
            {startText(gameLog.userName, gameLog.context)}
            <StyledProjectGameLogSpanColor gameLogText={gameLog.context}>
              {gameLog.context}
            </StyledProjectGameLogSpanColor>
            {endText(gameLog.context)}
          </StyledProjectGameLogText>
        ))}
      </StyledProjectGameLogTextContainer>
    </StyledProjectGameLogContainer>
  )
}

const StyledProjectGameLogContainer = styled.div`
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

const StyledProjectGameLogTextContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: ${calculateMinSizeBasedOnFigmaHeight(195)};
  height: ${calculateMinSizeBasedOnFigmaHeight(216)};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaHeight(2)} 0;
`

const StyledProjectGameLogText = styled.p`
  font-size: ${calculateMinSizeBasedOnFigmaHeight(12)};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.SPICY_MIX};
  letter-spacing: 0;
`

const StyledProjectGameLogSpanColor = styled.span<{ gameLogText: string }>`
  ${({ gameLogText, theme }) => css`
    ${gameLogText.includes(GAME_LOG_TYPE.CREATE) &&
    css`
      color: ${theme.COLORS.GREEN};
    `}
    ${gameLogText.includes(GAME_LOG_TYPE.DAMAGE) &&
    css`
      color: ${theme.COLORS.ERROR};
    `}
    ${gameLogText.includes(GAME_LOG_TYPE.HP) &&
    css`
      color: ${theme.COLORS.ERROR};
    `}
  `}
  padding: 0 ${calculateMinSizeBasedOnFigmaHeight(3)};
`
