import React, { FC, MouseEvent } from 'react'
import styled, { css } from 'styled-components'

type BgSrc = '/grain.png' | '/light-grain.png'
type Props = {
  className?: string
  text: string
  bgSrcs?: Record<'outer' | 'inner', BgSrc>
  onClick?: (e: MouseEvent) => void
  disabled?: boolean
}

export const CoarseButton: FC<Props> = ({
  className,
  text,
  bgSrcs = { inner: '/grain.png', outer: '/grain.png' },
  onClick,
  disabled = false,
}) => {
  return (
    <StyledButton className={className} bgSrc={bgSrcs.outer} onClick={onClick} disabled={disabled}>
      <StyledOuterMask>
        <StyledInnerWrapper bgSrc={bgSrcs.inner}>
          <StyledInnerMask>{text}</StyledInnerMask>
        </StyledInnerWrapper>
      </StyledOuterMask>
    </StyledButton>
  )
}

type ButtonStyle = { bgSrc: string; disabled: boolean }

const centeringFlexStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledButton = styled.button<ButtonStyle>`
  border-radius: 2px;

  ${({ bgSrc, theme }) => css`
    background-image: url(${bgSrc});
    font-size: ${theme.FONT_SIZES.SIZE_14};
    font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
  `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`
const StyledOuterMask = styled.div`
  ${centeringFlexStyle}
  width: 100%;
  height: 100%;
  border-radius: 2px;
`
const StyledInnerWrapper = styled.div<{ bgSrc: string }>`
  ${centeringFlexStyle}
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 2px;
  background-image: url(${({ bgSrc }) => bgSrc});
`
const StyledInnerMask = styled.div`
  ${centeringFlexStyle}
  width: 100%;
  height: 100%;
  border-radius: 2px;
`
