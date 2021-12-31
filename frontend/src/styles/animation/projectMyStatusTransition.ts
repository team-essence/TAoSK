import { css } from 'styled-components'

export const TRANSITION_DURATION_MS = 200

export const statusTextTransition = css`
  transition: transform ${TRANSITION_DURATION_MS}ms;
  will-change: transition;
`
