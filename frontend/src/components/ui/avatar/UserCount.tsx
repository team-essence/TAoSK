import React, { FC } from 'react'
import styled from 'styled-components'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'

type Props = {
  userCount: number
}

export const UserCount: FC<Props> = ({ userCount }) => {
  return (
    <UserCountContainer>
      <p>+{userCount}</p>
    </UserCountContainer>
  )
}

const UserCountContainer = styled.div`
  width: ${calculateVhBasedOnFigma(50)};
  height: ${calculateVhBasedOnFigma(50)};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: ${({ theme }) => theme.COLORS.MINE_SHAFT2};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`
