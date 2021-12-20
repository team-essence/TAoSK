import React, { FCX, useRef, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { SIGN_UP_CAMERA } from 'consts/defaultImages'

export const UPLOAD_BUTTON = {
  COARSE_BUTTON: 'CoarseButton',
  MODAL_BUTTON: 'CoarseRedOxideButton',
} as const
export type UPLOAD_BUTTON = typeof UPLOAD_BUTTON[keyof typeof UPLOAD_BUTTON]

type Props = {
  image: string
  defaultSrc: string
  handleChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void
  initializeUploadImg: () => void
  uploadButtonType: UPLOAD_BUTTON
  onClickUploadBtn?: () => void
  shouldDisabledUploadBtn?: boolean
  shouldDisabledDeleteBtn?: boolean
}

export const ImageInputField: FCX<Props> = ({
  className,
  image,
  defaultSrc,
  handleChangeImg,
  initializeUploadImg,
  uploadButtonType,
  onClickUploadBtn,
  shouldDisabledUploadBtn = false,
  shouldDisabledDeleteBtn = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const onClick = useCallback(() => {
    if (onClickUploadBtn) {
      onClickUploadBtn()
    } else {
      inputRef.current?.click()
    }
  }, [inputRef.current, onClickUploadBtn])

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
          onChange={handleChangeImg}
        />
      </StyledLabel>
      {uploadButtonType === UPLOAD_BUTTON.COARSE_BUTTON ? (
        <StyledCoarseButton
          text="画像をアップロード"
          onClick={onClick}
          disabled={shouldDisabledUploadBtn}
        />
      ) : (
        <StyledCoarseRedOxideButton
          text="画像をアップロード"
          onClick={onClick}
          disabled={shouldDisabledUploadBtn}
        />
      )}
      <StyledDeleteButton onClick={initializeUploadImg} disabled={shouldDisabledDeleteBtn}>
        画像を削除
      </StyledDeleteButton>
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const StyledLabel = styled.label`
  cursor: pointer;
  ${({ theme }) =>
    css`
      color: ${theme.COLORS.CHOCOLATE};
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    `}
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
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.3)};

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
`
const StyledDisappearedInput = styled.input`
  display: none;
`
const StyledDeleteButton = styled.button<{ disabled: boolean }>`
  margin: ${calculateMinSizeBasedOnFigma(4)} 0;
  width: ${calculateMinSizeBasedOnFigma(190)};
  ${({ theme, disabled }) =>
    css`
      color: ${disabled ? convertIntoRGBA(theme.COLORS.NOBEL, 0.64) : theme.COLORS.CHOCOLATE};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      ${disabled &&
      css`
        cursor: not-allowed;
      `}
    `}
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
const StyledCoarseRedOxideButton = styled(CoarseRedOxideButton)`
  margin: ${calculateMinSizeBasedOnFigma(4)} 0;
  width: ${calculateMinSizeBasedOnFigma(190)};
  height: ${calculateMinSizeBasedOnFigma(32)};
`
