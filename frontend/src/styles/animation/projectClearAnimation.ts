import { css, keyframes } from 'styled-components'

const stampKeyframes = keyframes`
  0% {
    transform: rotate(-2deg) scale(4.25423728);
  }
  9.803922% {
    transform: rotate(-4.26086952deg) scale(3.779661);
  }
  21.468627% {
    transform: rotate(-7.65217391deg) scale(3.30508476);
  }
  25.490196% {
    transform: rotate(-8.7826087deg) scale(2.89830508);
  }
  33.333333% {
    transform: rotate(-9.04347826deg) scale(1.91566264);
  }
  41.176471% {
    transform: rotate(-13.3043478deg) scale(1.3373494);
  }
  45.098039% {
    transform: rotate(-15deg) scale(0.85542168);
  }
  52.941176% {
    transform: rotate(-15deg) scale(0.55662652);
  }
  60.784314% {
    transform: rotate(-15deg) scale(0.3253012);
  }
  68.627451% {
    transform: rotate(-15deg) scale(0.56626508);
  }
  76.470588% {
    transform: rotate(-15deg) scale(0.90361444);
  }
  84.313725% {
    transform: rotate(-15deg) scale(0.80722892);
  }
  92.156863% {
    transform: rotate(-15deg) scale(0.85542168);
  }
  100% {
    transform: rotate(-15deg) scale(1);
  }
`

const ANIMATION_DURATION_MS = 250
const ANIMATION_DELAY_MS = 100
export const OPACITY_TRANSITION_DURATION_MS = 250
export const ANIMATION_TIME_MS = ANIMATION_DURATION_MS + ANIMATION_DELAY_MS

export const animation = {
  stamp: css`
    animation: ${stampKeyframes} ${ANIMATION_DURATION_MS}ms ${ANIMATION_DELAY_MS}ms both linear;
    // cubic-bezierの値はMuiBackdropにかかっているtransitionと同じ
    transition: opacity ${OPACITY_TRANSITION_DURATION_MS} cubic-bezier(0.4, 0, 0.2, 1);
    will-change: animation, transform, opacity;
  `,
} as const
