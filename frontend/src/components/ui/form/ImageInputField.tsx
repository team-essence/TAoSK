import React, { FC } from 'react'
import { useImageResize } from 'hooks/useImageResize'
import styled from 'styled-components'

export const ImageInputField: FC = () => {
  const defaultSrc = 'svg/camera.svg'
  const { resizedImageStr, handleUploadImg } = useImageResize(defaultSrc)

  return (
    <StyledAllWrapper marginBottom={'24px'}>
      <StyledLabel>
        プロフィール画像
        <StyledImageWrapper>
          <StyledImage
            src={resizedImageStr}
            padding={resizedImageStr === defaultSrc ? '40px' : '0px'}
          />
        </StyledImageWrapper>
        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleUploadImg} />
      </StyledLabel>
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.label<{ marginBottom: string }>`
  margin-bottom: ${props => props.marginBottom};
`
const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.chocolate};
  font-size: ${({ theme }) => theme.colors.chocolate};
  font-weight: 700;
`
const StyledImageWrapper = styled.div`
  width: 190px;
  height: 190px;
  border: 1px solid ${({ theme }) => theme.colors.chocolate};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
`

const StyledImage = styled.img<{ padding: string }>`
  aspect-ratio: 1 / 1;
  object-fit: contain;
  width: 100%;
  padding: ${props => props.padding};
`
