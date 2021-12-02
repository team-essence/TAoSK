import React, { FC } from 'react'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { MyPageStatusCard, STATUS_TYPE } from './MyPageStatusCard'

type Props = {
  className?: string
  technology: number
  solution: number
  achievement: number
  motivation: number
  design: number
  plan: number
}

export const MyPageStatus: FC<Props> = ({
  className,
  technology,
  solution,
  achievement,
  motivation,
  design,
  plan,
}) => {
  return (
    <StyledMyPageStatusContainer className={className}>
      <StyledStatusCardContainer>
        <h4>ステータス</h4>
        <MyPageStatusCard statusType={STATUS_TYPE.TECHNOLOGY} statValue={technology} />
        <MyPageStatusCard statusType={STATUS_TYPE.SOLUTION} statValue={solution} />
        <MyPageStatusCard statusType={STATUS_TYPE.ACHIEVEMENT} statValue={achievement} />
        <MyPageStatusCard statusType={STATUS_TYPE.MOTIVATION} statValue={motivation} />
        <MyPageStatusCard statusType={STATUS_TYPE.DESIGN} statValue={design} />
        <MyPageStatusCard statusType={STATUS_TYPE.PLAN} statValue={plan} />
      </StyledStatusCardContainer>

      <StyleMyPageStatusBackground
        src="/svg/user-status_background.svg"
        alt="ステータスバックグランド"
      />
    </StyledMyPageStatusContainer>
  )
}

const StyledMyPageStatusContainer = styled.div`
  position: relative;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`

const StyleMyPageStatusBackground = styled.img`
  width: ${calculateMinSizeBasedOnFigmaWidth(345)};
`

const StyledStatusCardContainer = styled.div`
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaWidth(9)} 0;

  h4 {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
    color: ${({ theme }) => theme.COLORS.BIZARRE};
  }
`
