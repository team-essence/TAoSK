import React, { FCX, useRef } from 'react'
import styled, { css } from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { SIGN_UP_CAMERA } from 'consts/defaultImages'

type Props = {
  image: string
  defaultSrc: string
  handleUploadImg: (e: React.ChangeEvent<HTMLInputElement>) => void
  initializeUploadImg: () => void
}

export const ImageInputField: FCX<Props> = ({
  className,
  image,
  defaultSrc,
  handleUploadImg,
  initializeUploadImg,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const onClickUploadBtn = () => inputRef.current?.click()

  return (
    <StyledAllWrapper className={className}>
      <StyledLabel>
        プロフィール画像
        <StyledImageWrapper>
          <StyledImage src={image} alt="プロフィール画像" />
          {image === defaultSrc && <StyledDefaultImageOverlay />}
        </StyledImageWrapper>
        <StyledDisappearedInput
          ref={inputRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleUploadImg}
        />
      </StyledLabel>

      <StyledCoarseButton text="画像をアップロード" onClick={onClickUploadBtn} />
      <StyledDeleteButton onClick={initializeUploadImg}>画像を削除</StyledDeleteButton>
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const StyledLabel = styled.label`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  cursor: pointer;
`
const StyledImageWrapper = styled.div`
  position: relative;
  margin: ${calculateMinSizeBasedOnFigma(4)} 0;
  width: ${calculateMinSizeBasedOnFigma(190)};
  height: ${calculateMinSizeBasedOnFigma(190)};
  border: 1px solid ${({ theme }) => theme.COLORS.CHOCOLATE};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledImage = styled.img`
  aspect-ratio: 1 / 1;
  object-fit: cover;
  width: 100%;
`
const StyledDefaultImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${({ theme }) =>
    css`
      background-color: ${convertIntoRGBA(theme.COLORS.BLACK, 0.3)};
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: ${calculateMinSizeBasedOnFigma(104.3)};
        height: ${calculateMinSizeBasedOnFigma(82.87)};
        background-image: url(${SIGN_UP_CAMERA});
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
      }
    `}
`
const StyledDisappearedInput = styled.input`
  display: none;
`
const StyledDeleteButton = styled.button`
  margin: ${calculateMinSizeBasedOnFigma(4)} 0;
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`
const StyledCoarseButton = styled(CoarseButton)`
  margin: ${calculateMinSizeBasedOnFigma(4)} 0;
  width: ${calculateMinSizeBasedOnFigma(190)};
  height: ${calculateMinSizeBasedOnFigma(40)};

  ${({ theme }) => css`
    box-shadow: 0px 2px 4px 0px ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
    color: ${theme.COLORS.BRANDY};
    > div {
      background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
      > div > div {
        background-color: ${convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)};
      }
    }
  `}
`
