import { css, keyframes } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'

const rankUpTransformKeyframes = keyframes`
  0% {
    transform: translateY(${calculateMinSizeBasedOnFigmaWidth(43)});
  }
  50% {
    transform: translateY(${calculateMinSizeBasedOnFigmaWidth(0)});
  }

  100% {
    transform: translateY(${calculateMinSizeBasedOnFigmaWidth(-8)});
  }
`
const rankUpOpacityKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const TRANSITION_DURATION_MS = 200
export const RANK_UP_DURATION_MS = 1500

export const animation = {
  statusText: css`
    transition: transform ${TRANSITION_DURATION_MS}ms;
    will-change: transition;
  `,
  rankUp: css`
    animation: ${rankUpTransformKeyframes} ${RANK_UP_DURATION_MS}ms both linear,
      ${rankUpOpacityKeyframes} ${RANK_UP_DURATION_MS * 0.75}ms ${RANK_UP_DURATION_MS * 0.25}ms both
        linear;
    will-change: animation, opacity, transform;
  `,
} as const
