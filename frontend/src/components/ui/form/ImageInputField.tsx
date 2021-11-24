import React, { FC, useRef } from 'react'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import styled from 'styled-components'
import { theme } from 'styles/theme'

type Props = {
  className?: string
  dottedImage: string
  defaultSrc: string
  handleUploadImg: (e: React.ChangeEvent<HTMLInputElement>) => void
  initializeUploadImg: () => void
}

export const ImageInputField: FC<Props> = ({
  className,
  dottedImage,
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
`
const StyledImageWrapper = styled.div`
  margin: 4px 0;
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
  margin: 4px 0;
  box-shadow: 0px 2px 4px 0px ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
`
const StyledDeleteButton = styled.button`
  margin: 4px 0;
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`
