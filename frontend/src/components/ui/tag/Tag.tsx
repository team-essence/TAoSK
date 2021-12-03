import React, { FC, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { CrossIcon } from 'components/ui/icon/CrossIcon'

type Props = {
  className?: string
  name: string
  onClick?: () => void
}

export const Tag: FC<Props> = ({ className, name, onClick }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [refHeight, setRefHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    setRefHeight(ref.current.clientHeight)
  }, [ref])

  return (
    <StyledTagContainer className={className}>
      <StyledTagTriangle refHeight={refHeight} />
      <StyledTag ref={ref}>
        <p>{name}</p>
        {!!onClick && (
          <StyledButton onClick={onClick}>
            <StyledCrossIcon color={theme.COLORS.CHOCOLATE} />
          </StyledButton>
        )}
      </StyledTag>
    </StyledTagContainer>
  )
}

const StyledTagContainer = styled.div`
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

// BUG: ウィンドウが小さすぎるとリピートした画像の隙間が見える
const StyledTag = styled.div`
  min-width: ${calculateMinSizeBasedOnFigmaWidth(16)};
  min-height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  background: url('/svg/tag_background.svg');
  background-repeat: repeat-x;
  background-size: contain;
  display: flex;
  align-items: center;

  p {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
    margin: 0 ${calculateMinSizeBasedOnFigmaWidth(7)};
  }
`

const StyledButton = styled.button``

const StyledCrossIcon = styled(CrossIcon)`
  height: 100%;
  padding: ${calculateMinSizeBasedOnFigmaWidth(10)} ${calculateMinSizeBasedOnFigmaWidth(7)}
    ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
  svg {
    width: ${calculateMinSizeBasedOnFigmaWidth(8)};
    height: ${calculateMinSizeBasedOnFigmaWidth(8)};
  }
`
