import React, { FCX } from 'react'
import styled from 'styled-components'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigmaWidth,
} from 'utils/calculateSizeBasedOnFigma'

type Props = {
  onClick: () => void
}

export const CreateListButton: FCX<Props> = ({ className, onClick }) => {
  return <StyledCreateListButton className={className} onClick={onClick} />
}

const StyledCreateListButton = styled.button`
  width: ${calculateMinSizeBasedOnFigmaHeight(270)};
  height: ${calculateMinSizeBasedOnFigmaHeight(52.06)};
  background: url('/svg/create-list_button.svg');
  background-repeat: no-repeat;
  background-size: contain;
`
