import React, { FC } from 'react'
import styled from 'styled-components'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigmaWidth,
} from 'utils/calculateSizeBasedOnFigma'

type Props = {
  className?: string
  onClick: () => void
}

export const ProjectCreateListButton: FC<Props> = ({ className, onClick }) => {
  return <StyledProjectCreateListButton className={className} onClick={onClick} />
}

const StyledProjectCreateListButton = styled.button`
  width: ${calculateMinSizeBasedOnFigmaHeight(270)};
  height: ${calculateMinSizeBasedOnFigmaHeight(52.06)};
  background: url('/svg/create-list_button.svg');
  background-repeat: no-repeat;
  background-size: contain;
`
