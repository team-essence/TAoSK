import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import MuiBackdrop from '@mui/material/Backdrop'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { animation } from 'styles/animation/stampAnimation'

type Props = { shouldOpen: boolean }

export const ProjectClearOverlay: FCX<Props> = ({ className, shouldOpen }) => {
  return (
    <StyledMuiBackdrop className={className} open={shouldOpen} invisible={true}>
      <StyledOverlay>
        {/* &&演算子なしでコンポーネントを置くとkeyframesアニメーションが効かなくなる */}
        {shouldOpen && (
          <StyledQuestClearStamp src="/svg/project__quest-clear.svg" alt="QUEST CLEAR" />
        )}
      </StyledOverlay>
    </StyledMuiBackdrop>
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
  display: inline-block;
  width: ${calculateMinSizeBasedOnFigma(782)};
  height: ${calculateMinSizeBasedOnFigma(535)};
  ${animation.stamp}
`
