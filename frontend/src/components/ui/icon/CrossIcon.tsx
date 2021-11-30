import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  onClick?: (e: MouseEvent) => void
  color: string
  isSquared?: boolean
}

export const CrossIcon: FC<Props> = ({ className, onClick, color, isSquared = true }) => {
  return (
    <StyledWrapper className={className} onClick={onClick}>
      {isSquared ? (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M18.1992 3.7998L4.10054 18.1999"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="square"
          />
          <path
            d="M3.80029 3.80029L17.899 18.2003"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="square"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M17.1992 2.7998L3.10054 17.1999"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M2.80029 2.80029L16.899 17.2003"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
