import React, { FCX } from 'react'
import styled from 'styled-components'
import MuiBackdrop from '@mui/material/Backdrop'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { animation } from 'styles/animation/projectClearAnimation'

type Props = { shouldOpen: boolean }

export const ProjectClearOverlay: FCX<Props> = ({ className, shouldOpen }) => {
  return (
    <>
      <StyledMuiBackdrop className={className} open={shouldOpen} invisible={true}>
        <StyledOverlay />
      </StyledMuiBackdrop>
      {/* MuiBackdropの中に置くとアニメーションが効かないことが多くなるので外に記述する（opacityのアニメーションと衝突してしまうため？ */}
      {shouldOpen && (
        <StyledQuestClearStamp src="/svg/project__quest-clear.svg" alt="QUEST CLEAR" />
      )}
    </>
  )
}

const StyledMuiBackdrop = styled(MuiBackdrop)`
  z-index: ${({ theme }) => theme.Z_INDEX.OVERLAY};
`

const StyledOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.7)};
`
const StyledQuestClearStamp = styled.img`
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
`
