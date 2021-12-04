import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
}

export const ProjectMyInfo: FC<Props> = ({ className }) => {
  return <StyledProjectMyInfoContainer className={className}></StyledProjectMyInfoContainer>
}

const StyledProjectMyInfoContainer = styled.div``
