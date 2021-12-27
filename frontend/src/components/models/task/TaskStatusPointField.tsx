import React, { FCX, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'
import styled, { css, FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components'
import { convertParamIntoJp } from 'utils/convertParamIntoJp'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { checkObjEqual } from 'utils/checkObjEqual'
import { useIncrementAndDecrement } from 'hooks/useIncrementAndDecrement'
import { StatusParam } from 'types/status'
import { INITIAL_STATUS_COUNTS } from 'consts/status'

type Props = {
  status: StatusParam
  statusCounts: Record<StatusParam, number>
  setStatusCounts: Dispatch<SetStateAction<Record<StatusParam, number>>>
  completedFlag: boolean
}

export const TaskStatusPointField: FCX<Props> = ({
  className,
  status,
  statusCounts,
  setStatusCounts,
  completedFlag,
}) => {
  const { count, setCount, increment, decrement, isDisabledIncrement, isDisabledDecrement } =
    useIncrementAndDecrement(10, 0)
  const isComponentMounted = useRef<boolean>(false)

  useEffect(() => {
    const setCachedStatusCounts = () => {
      if (!checkObjEqual(statusCounts, INITIAL_STATUS_COUNTS)) {
        // モーダルを開いた時にstatusCountsの値が初期値でなかった時
        setCount(statusCounts[status])
      }
    }

    if (isComponentMounted.current) {
      setStatusCounts(prev => ({ ...prev, [status]: count }))
    } else {
      setCachedStatusCounts()
      isComponentMounted.current = true
    }
  }, [count])

  return (
    <StyledStatusWrapper className={className}>
      <StyledIconBox status={status}>
        <StyledStatusIcon status={status} />
      </StyledIconBox>

      <StyledStatusName>{convertParamIntoJp(status)}</StyledStatusName>

      <StyledCountWrapper>
        <StyledMinusBtn onClick={decrement} disabled={isDisabledDecrement || completedFlag} />
        <StyledCountText>+{count}</StyledCountText>
        <StyledPlusBtn onClick={increment} disabled={isDisabledIncrement || completedFlag} />
      </StyledCountWrapper>
    </StyledStatusWrapper>
  )
}

const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: ${calculateMinSizeBasedOnFigma(4)};
  padding-right: ${calculateMinSizeBasedOnFigma(15)};
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(34)};
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
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigma(28)};
  height: ${calculateMinSizeBasedOnFigma(28)};
  border: solid 1px ${({ theme }) => theme.COLORS.ALTO};
  background-color: ${innerBg};
  border-radius: 4px;
  box-shadow: 0 ${calculateMinSizeBasedOnFigma(4)} ${calculateMinSizeBasedOnFigma(4)}
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
const StyledIconBox = styled.div<{ status: StatusParam }>`
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
const StyledStatusIcon = styled.div<{ status: StatusParam }>`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_1};
  object-fit: contain;
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigma(20)};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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
  margin-left: ${calculateMinSizeBasedOnFigma(4)};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`
const StyledCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigma(84)};
  height: ${calculateMinSizeBasedOnFigma(28)};
`
const countBtnCss = css`
  width: ${calculateMinSizeBasedOnFigma(24)};
  height: ${calculateMinSizeBasedOnFigma(26)};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
const StyledPlusBtn = styled.button<{ disabled: boolean }>`
  ${countBtnCss}
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
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
          cursor: not-allowed;
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
