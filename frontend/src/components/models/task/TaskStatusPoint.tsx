import React, { FC } from 'react'
import styled from 'styled-components'
import { StatusPointField } from 'components/ui/form/StatusPointField'

type Props = {
  className?: string
}

export const TaskStatusPoint: FC<Props> = ({ className }) => {
  return (
    <StyledAllWrapper className={className}>
      <StyledTitle>獲得ステータスポイント</StyledTitle>
      <StatusPointField status="技術力" />
      <StatusPointField status="達成力" />
      <StatusPointField status="解決力" />
      <StatusPointField status="意欲" />
      <StatusPointField status="デザイン" />
      <StatusPointField status="設計力" />
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const StyledTitle = styled.p`
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
