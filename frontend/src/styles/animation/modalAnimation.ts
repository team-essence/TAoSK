import { css, keyframes } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

const backdropKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const namePlateKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(${calculateMinSizeBasedOnFigma(5)});
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`

const closeButtonKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const childrenKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(${calculateMinSizeBasedOnFigma(5)});
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const bgLeftKeyframes = keyframes`
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 0%;
  }
`

const bgRightKeyframes = keyframes`
  0% {
    background-position: 200%;
  }
  100% {
    background-position: 100%;
  }
`

export const animation = {
  backdrop: css`
    animation: ${backdropKeyframes} 0.5s both linear;
    will-change: animation, opacity;
  `,
  namePlate: css`
    animation: ${namePlateKeyframes} 0.25s both ease;
    will-change: animation, opacity, transform;
  `,
  closeButton: css`
    animation: ${closeButtonKeyframes} 0.25s both ease;
    will-change: animation, opacity;
  `,
  children: css`
    animation: ${childrenKeyframes} 0.3s 0.6s both linear;
    will-change: animation, opacity, transform;
  `,
  bgLeft: css`
    animation: ${bgLeftKeyframes} 0.25s 0.15s both ease;
    will-change: animation, background-position;
  `,
  bgRight: css`
    animation: ${bgRightKeyframes} 0.25s 0.15s both ease;
    will-change: animation, background-position;
  `,
} as const
