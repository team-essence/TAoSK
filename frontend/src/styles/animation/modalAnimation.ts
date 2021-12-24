import { keyframes } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

export const backdropFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const titleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(${calculateMinSizeBasedOnFigma(5)});
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`
