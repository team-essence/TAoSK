import { css, keyframes } from 'styled-components'

const stampKeyframes = keyframes`
  0% {
    transform: rotate(-2deg) scale(3.2);
  }
  100% {
    transform: rotate(-15deg) scale(1);
  }
`

export const animation = {
  stamp: css`
    animation: ${stampKeyframes} 250ms both linear;
    will-change: animation, transform;
  `,
} as const
