import { css, keyframes } from 'styled-components'

const stampKeyframes = keyframes`
  0% {
    transform: rotate(-2deg) scale(1.81355932);
  }
  9.803922% {
    transform: rotate(-4.26086952deg) scale(1.69491525);
  }
  21.468627% {
    transform: rotate(-7.65217391deg) scale(1.57627119);
  }
  25.490196% {
    transform: rotate(-8.7826087deg) scale(1.47457627);
  }
  33.333333% {
    transform: rotate(-9.04347826deg) scale(1.22891566);
  }
  41.176471% {
    transform: rotate(-13.3043478deg) scale(1.08433735);
  }
  45.098039% {
    transform: rotate(-15deg) scale(0.96385542);
  }
  52.941176% {
    transform: rotate(-15deg) scale(0.88915663);
  }
  60.784314% {
    transform: rotate(-15deg) scale(0.8313253);
  }
  68.627451% {
    transform: rotate(-15deg) scale(0.89156627);
  }
  76.470588% {
    transform: rotate(-15deg) scale(0.97590361);
  }
  84.313725% {
    transform: rotate(-15deg) scale(0.95180723);
  }
  92.156863% {
    transform: rotate(-15deg) scale(0.96385542);
  }
  100% {
    transform: rotate(-15deg) scale(1);
  }
`

export const animation = {
  stamp: css`
    animation: ${stampKeyframes} 250ms 100ms both linear;
    will-change: animation, transform;
  `,
} as const
