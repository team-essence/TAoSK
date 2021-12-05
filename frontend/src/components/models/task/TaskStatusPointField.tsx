import React, { FC, useEffect, Dispatch, SetStateAction } from 'react'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'
import styled, { css, FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { useIncrementAndDecrement } from 'hooks/useIncrementAndDecrement'

type Status = 'technology' | 'achievement' | 'solution' | 'motivation' | 'design' | 'plan'

type Props = {
  status: Status
  setStatus: Dispatch<SetStateAction<Record<Status, number>>>
}

export const TaskStatusPointField: FC<Props> = ({ status, setStatus }) => {
  const { count, increment, decrement, isDisabledIncrement, isDisabledDecrement } =
    useIncrementAndDecrement(10, 0)
  // TODO: h-jun01のやつマージしたらutilのconvertなんちゃらで置き換える
  const statusNameObj: Record<Status, string> = {
    technology: '技術力',
    achievement: '達成力',
    solution: '解決力',
    motivation: '意欲',
    design: 'デザイン',
    plan: '設計力',
  }

  useEffect(() => {
    setStatus(prev => ({ ...prev, [status]: count }))
  }, [count])

  return (
    <StyledStatusWrapper>
      <StyledIconBox status={status}>
        <StyledStatusIcon status={status} />
      </StyledIconBox>

      <StyledStatusName>{statusNameObj[status]}</StyledStatusName>

      <StyledCountWrapper>
        <StyledMinusBtn onClick={decrement} disabled={isDisabledDecrement} />
        <StyledCountText>+{count}</StyledCountText>
        <StyledPlusBtn onClick={increment} disabled={isDisabledIncrement} />
      </StyledCountWrapper>
    </StyledStatusWrapper>
  )
}

const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(4)};
  padding-right: ${calculateMinSizeBasedOnFigmaWidth(15)};
  width: 100%;
  height: ${calculateMinSizeBasedOnFigmaWidth(38)};
  border: solid 2px ${({ theme }) => convertIntoRGBA(theme.COLORS.TOBACCO_BROWN, 0.6)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.BIZARRE};
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
`

const iconBoxCss = (
  innerBg: string,
  afterBg: string,
): FlattenInterpolation<ThemeProps<DefaultTheme>> => css`
  position: relative;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(28)};
  height: ${calculateMinSizeBasedOnFigmaWidth(28)};
  border: solid 1px ${({ theme }) => theme.COLORS.ALTO};
  background-color: ${innerBg};
  border-radius: 4px;
  box-shadow: 0 ${calculateMinSizeBasedOnFigmaWidth(4)} ${calculateMinSizeBasedOnFigmaWidth(4)}
    ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)} inset;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${afterBg};
  }
`
const StyledIconBox = styled.div<{ status: Status }>`
  ${({ status, theme }) => {
    switch (status) {
      case 'technology':
        return iconBoxCss(theme.COLORS.TECHNOLOGY, convertIntoRGBA(theme.COLORS.BLACK, 0.2))
      case 'achievement':
        return iconBoxCss(theme.COLORS.ACHIEVEMENT, 'transparent')
      case 'solution':
        return iconBoxCss(theme.COLORS.SOLUTION, convertIntoRGBA(theme.COLORS.BLACK, 0.05))
      case 'motivation':
        return iconBoxCss(theme.COLORS.MOTIVATION, convertIntoRGBA(theme.COLORS.BLACK, 0.05))
      case 'design':
        return iconBoxCss(theme.COLORS.DESIGN, convertIntoRGBA(theme.COLORS.BLACK, 0.05))
      case 'plan':
        return iconBoxCss(theme.COLORS.PLAN, convertIntoRGBA(theme.COLORS.BLACK, 0.05))
      default: {
        const _exhaustiveCheck: never = status
        throw new Error(`${status} is not status`)
      }
    }
  }}
`
const StyledStatusIcon = styled.div<{ status: Status }>`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  object-fit: contain;
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigmaWidth(20)};
  background-size: contain;
  ${({ status }) => {
    switch (status) {
      case 'technology':
        return css`
          background-image: url('/svg/status-technology.svg');
        `
      case 'achievement':
        return css`
          background-image: url('/svg/status-achievement.svg');
        `
      case 'solution':
        return css`
          background-image: url('/svg/status-solution.svg');
        `
      case 'motivation':
        return css`
          background-image: url('/svg/status-motivation.svg');
        `
      case 'design':
        return css`
          background-image: url('/svg/status-design.svg');
        `
      case 'plan':
        return css`
          background-image: url('/svg/status-plan.svg');
        `
      default: {
        const _exhaustiveCheck: never = status
        throw new Error(`${status} is not status`)
      }
    }
  }}
`
const StyledStatusName = styled.p`
  margin-left: ${calculateMinSizeBasedOnFigmaWidth(4)};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`
const StyledCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(84)};
  height: ${calculateMinSizeBasedOnFigmaWidth(28)};
`
const countBtnCss = css`
  width: ${calculateMinSizeBasedOnFigmaWidth(24)};
  height: ${calculateMinSizeBasedOnFigmaWidth(26)};
  background-size: contain;
`
const StyledPlusBtn = styled.button<{ disabled: boolean }>`
  ${countBtnCss}
  ${({ disabled }) =>
    disabled
      ? css`
          background-image: url('/svg/status-plus-disabled.svg');
        `
      : css`
          background-image: url('/svg/status-plus.svg');
        `}
`
const StyledMinusBtn = styled.button`
  ${countBtnCss}
  ${({ disabled }) =>
    disabled
      ? css`
          background-image: url('/svg/status-minus-disabled.svg');
        `
      : css`
          background-image: url('/svg/status-minus.svg');
        `}
`
const StyledCountText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`
