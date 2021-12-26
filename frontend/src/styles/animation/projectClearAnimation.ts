import { css, keyframes } from 'styled-components'

const stampKeyframe = keyframes`
  0%{
    opacity: 0;
  }
  10%{
    opacity: 1;
    transform-origin: 50% 50%;
    transform: rotate(-2deg) scale(10);
  }
  100%{
    transform: rotate(-15deg) scale(1);
  }
`

export const animation = {
  stamp: css`
    /* FIXME: なぜか時間が短いとアニメーションが効かない。15sのように長く設定すると効くようになる。MuiBackdropに内包されているのが原因? */
    animation: ${stampKeyframe} 5s both linear;
    will-change: animation, transition, transform, opacity;
  `,
} as const
