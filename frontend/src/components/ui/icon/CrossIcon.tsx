import React, { FC, MouseEvent, SVGAttributes } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  onClick?: (e: MouseEvent) => void
  color: string
  strokeLinecap?: SVGAttributes<SVGPathElement>['strokeLinecap']
  strokeWidth?: SVGAttributes<SVGPathElement>['strokeWidth']
}

export const CrossIcon: FC<Props> = ({
  className,
  onClick,
  color,
  strokeLinecap = 'square',
  strokeWidth = 5,
}) => {
  return (
    <StyledWrapper className={className} onClick={onClick}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M18.1992 3.7998L4.10054 18.1999"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
        />
        <path
          d="M3.80029 3.80029L17.899 18.2003"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
        />
      </svg>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
