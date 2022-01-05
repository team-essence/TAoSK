import React, { FCX, ReactNode } from 'react'
import styled from 'styled-components'

export const CANVAS_BACKGROUND_IMG = {
  MORNING: '/cgBackground/morning.jpg',
  AFTERNOON: '/cgBackground/afternoon.jpg',
  NIGHT: '/cgBackground/night.jpg',
  NORMAL: '/cgBackground/normal.jpg',
} as const
export type CANVAS_BACKGROUND_IMG = typeof CANVAS_BACKGROUND_IMG[keyof typeof CANVAS_BACKGROUND_IMG]

type Props = {
  canvasBackgroundImg: CANVAS_BACKGROUND_IMG
}

export const CgCanvasWrapper: FCX<Props> = ({ className, children, canvasBackgroundImg }) => {
  return (
    <StyledCgCanvasWrapper canvasBackgroundImg={canvasBackgroundImg} className={className}>
      {children}
    </StyledCgCanvasWrapper>
  )
}

const StyledCgCanvasWrapper = styled.div<{ canvasBackgroundImg: CANVAS_BACKGROUND_IMG }>`
  width: 100%;
  height: 80%;
  background: url(${({ canvasBackgroundImg }) => canvasBackgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`
