import React, { FCX, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import MuiBackdrop from '@mui/material/Backdrop'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import {
  animation,
  ANIMATION_TIME_MS,
  OPACITY_TRANSITION_DURATION_MS,
} from 'styles/animation/projectClearAnimation'

type Props = { shouldOpen: boolean }

export const ProjectClearOverlay: FCX<Props> = ({ className, shouldOpen }) => {
  const [hasClicked, setHasClicked] = useState<boolean>(false)
  const [hasAnimationDone, setHasAnimationDone] = useState<boolean>(false)
  const [hasBackdropDisappeared, setHasBackdropDisappeared] = useState<boolean>(false)

  useEffect(() => {
    if (shouldOpen) {
      const MARGIN_TIME = 800
      setTimeout(() => setHasAnimationDone(true), ANIMATION_TIME_MS + MARGIN_TIME)
    }
  }, [shouldOpen])

  useEffect(() => {
    if (hasClicked) {
      setTimeout(() => setHasBackdropDisappeared(true), OPACITY_TRANSITION_DURATION_MS)
    }
  }, [hasClicked])

  const onClick = useCallback(() => {
    if (hasAnimationDone) {
      setHasClicked(true)
    }
  }, [hasAnimationDone])

  return (
    <>
      <StyledMuiBackdrop
        className={className}
        open={shouldOpen && !hasClicked}
        invisible={true}
        transitionDuration={OPACITY_TRANSITION_DURATION_MS}
        onClick={onClick}>
        <StyledOverlay hasAnimationDone={hasAnimationDone} />
      </StyledMuiBackdrop>
      {/* MuiBackdropの中に置くとアニメーションが効かないことが多くなるので外に記述する（MuiBackdropのopacityのアニメーションと衝突してしまうため？ */}
      {shouldOpen && !hasBackdropDisappeared && (
        <StyledQuestClearStamp
          src="/svg/project__quest-clear.svg"
          alt="QUEST CLEAR"
          hasClicked={hasClicked}
          hasAnimationDone={hasAnimationDone}
          onClick={onClick}
        />
      )}
    </>
  )
}

const StyledMuiBackdrop = styled(MuiBackdrop)`
  z-index: ${({ theme }) => theme.Z_INDEX.OVERLAY};
`

const StyledOverlay = styled.div<{ hasAnimationDone: boolean }>`
  cursor: ${({ hasAnimationDone }) => (hasAnimationDone ? 'pointer' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.7)};
`
const StyledQuestClearStamp = styled.img<{ hasClicked: boolean; hasAnimationDone: boolean }>`
  cursor: ${({ hasAnimationDone }) => (hasAnimationDone ? 'pointer' : 'auto')};
  z-index: ${({ theme }) => theme.Z_INDEX.UPPER_OVERLAY};
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: ${calculateMinSizeBasedOnFigma(782)};
  height: ${calculateMinSizeBasedOnFigma(535)};
  ${animation.stamp}
  opacity: ${({ hasClicked }) => (hasClicked ? 0 : 1)};
`
