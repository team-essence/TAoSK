import React, { FCX, useRef } from 'react'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

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
          <StyledImage
            src={image}
            alt="プロフィール画像"
            defaultSrc={image === defaultSrc ? true : false}
          />
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
  margin: ${calculateMinSizeBasedOnFigma(4)} 0;
  width: ${calculateMinSizeBasedOnFigma(190)};
  height: ${calculateMinSizeBasedOnFigma(190)};
  border: 1px solid ${({ theme }) => theme.COLORS.CHOCOLATE};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledImage = styled.img<{ defaultSrc: boolean }>`
  aspect-ratio: 1 / 1;
  object-fit: ${({ defaultSrc }) => (defaultSrc ? 'contain' : 'cover')};
  width: 100%;
  padding: ${({ defaultSrc }) => (defaultSrc ? calculateMinSizeBasedOnFigma(40) : '0px')};
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
