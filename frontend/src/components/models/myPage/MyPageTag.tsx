import React, { FC, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  className?: string
  name: string
}

export const MyPageTag: FC<Props> = ({ className, name }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [refHeight, setRefHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    setRefHeight(ref.current.clientHeight)
  }, [ref])

  return (
    <StyledMyPageTagContainer className={className}>
      <StyledTagTriangle refHeight={refHeight} />
      <StyledTag ref={ref}>
        <p>{name}</p>
      </StyledTag>
    </StyledMyPageTagContainer>
  )
}

const StyledMyPageTagContainer = styled.div`
  display: inline-flex;
  align-items: center;
`

const StyledTagTriangle = styled.div<{ refHeight?: number }>`
  width: ${calculateMinSizeBasedOnFigmaWidth(18)};
  height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  ${({ refHeight }) =>
    refHeight &&
    css`
      height: ${calculateMinSizeBasedOnFigmaWidth(refHeight)};
    `}

  background: url('/svg/tag-triangle_background.svg');
  background-repeat: no-repeat;
  background-size: cover;
`

const StyledTag = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(6)} ${calculateMinSizeBasedOnFigmaWidth(7)};
  width: fit-content;
  background: url('/svg/tag_background.svg');
  background-repeat: repeat-x;
  background-size: contain;

  p {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  }
`
