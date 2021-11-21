import React, { FC, useRef } from 'react'
import { useImageResize } from 'hooks/useImageResize'
import { useConvertToDottedImage } from 'hooks/useConvertToDottedImage'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import styled from 'styled-components'
import { theme } from 'styles/theme'

type Props = { className?: string }

export const ImageInputField: FC<Props> = ({ className }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const defaultSrc = 'svg/camera.svg'
  // 一辺60px以下の画像を生成
  const { canvasContext, resizedImageStr, initializeUploadImg, handleUploadImg } = useImageResize(
    defaultSrc,
    60,
  )
  // 色数50以下のドット画像を生成
  const { dottedImage } = useConvertToDottedImage(resizedImageStr, 50, canvasContext)

  const onClickUploadBtn = () => inputRef.current?.click()

  return (
    <div className={className}>
      <StyledLabel>
        プロフィール画像
        <StyledImageWrapper>
          <StyledImage src={dottedImage} padding={dottedImage === defaultSrc ? '40px' : '0px'} />
        </StyledImageWrapper>
        <StyledDisappearedInput
          ref={inputRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleUploadImg}
        />
      </StyledLabel>

      <StyledCoarseButton
        text="画像をアップロード"
        aspect={{
          width: '190px',
          height: '40px',
        }}
        outerBgColor={convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)}
        innerBgColor={convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)}
        color={theme.COLORS.BRANDY}
        onClick={onClickUploadBtn}
      />
      <StyledDeleteButton onClick={initializeUploadImg}>画像を削除</StyledDeleteButton>
    </div>
  )
}

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: 700;
`
const StyledImageWrapper = styled.div`
  width: 190px;
  height: 190px;
  border: 1px solid ${({ theme }) => theme.COLORS.CHOCOLATE};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledImage = styled.img<{ padding: string }>`
  aspect-ratio: 1 / 1;
  object-fit: contain;
  width: 100%;
  padding: ${({ padding }) => padding};
`
const StyledDisappearedInput = styled.input`
  display: none;
`
const StyledCoarseButton = styled(CoarseButton)`
  margin-top: 14px;
`
const StyledDeleteButton = styled.button`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`