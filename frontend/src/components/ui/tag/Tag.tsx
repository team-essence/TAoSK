import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { CrossIcon } from 'components/ui/icon/CrossIcon'

type Props = {
  name: string
  onClick?: () => void
  tagType: TAG_TYPE
}

// TODO: 今後、もしlargeサイズが追加された時のためにlargeも置いとく
export const TAG_TYPE = {
  LARGE: 'large',
  NORMAL: 'normal',
  SMALL: 'small',
} as const
export type TAG_TYPE = typeof TAG_TYPE[keyof typeof TAG_TYPE]

export const Tag: FCX<Props> = ({ className, name, onClick, tagType }) => {
  return (
    <StyledTagContainer className={className}>
      <StyledTagTriangle tagType={tagType} />
      <StyledTag tagType={tagType}>
        <StyledTagName>{name}</StyledTagName>
        {!!onClick && (
          <StyledButton onClick={onClick}>
            <StyledCrossIcon tagType={tagType} color={theme.COLORS.CHOCOLATE} />
          </StyledButton>
        )}
      </StyledTag>
    </StyledTagContainer>
  )
}

const StyledTagContainer = styled.div`
  display: inline-flex;
  align-items: center;
`

const StyledTagTriangle = styled.div<{ tagType: TAG_TYPE }>`
  ${({ tagType }) => css`
    ${tagType === TAG_TYPE.NORMAL &&
    css`
      width: ${calculateMinSizeBasedOnFigmaWidth(18)};
      height: ${calculateMinSizeBasedOnFigmaWidth(32)};
      background: url('/svg/tag-triangle_background.svg');
    `}

    ${tagType === TAG_TYPE.SMALL &&
    css`
      width: ${calculateMinSizeBasedOnFigmaWidth(15)};
      height: ${calculateMinSizeBasedOnFigmaWidth(24)};
      background: url('/svg/tag-triangle-small_background.svg');
    `}
  `}

  background-repeat: no-repeat;
  background-size: cover;
`

// BUG: ウィンドウが小さすぎるとリピートした画像の隙間が見える
const StyledTag = styled.div<{ tagType: TAG_TYPE }>`
  background: url('/svg/tag_background.svg');
  background-repeat: repeat-x;
  background-size: contain;
  display: flex;
  align-items: center;

  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  }

  ${({ tagType }) => css`
    ${tagType === TAG_TYPE.NORMAL &&
    css`
      min-width: ${calculateMinSizeBasedOnFigmaWidth(16)};
      min-height: ${calculateMinSizeBasedOnFigmaWidth(32)};

      p {
        font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
        margin-left: ${calculateMinSizeBasedOnFigmaWidth(6)};
        margin-right: ${calculateMinSizeBasedOnFigmaWidth(8)};
      }
    `}

    ${tagType === TAG_TYPE.SMALL &&
    css`
      min-width: ${calculateMinSizeBasedOnFigmaWidth(15)};
      min-height: ${calculateMinSizeBasedOnFigmaWidth(24)};

      p {
        font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
        margin-left: ${calculateMinSizeBasedOnFigmaWidth(4)};
        margin-right: ${calculateMinSizeBasedOnFigmaWidth(6)};
      }
    `}
  `}
`

const StyledButton = styled.button``
const StyledCrossIcon = styled(CrossIcon)<{ tagType: TAG_TYPE }>`
  height: 100%;
  svg {
    width: ${calculateMinSizeBasedOnFigmaWidth(8)};
    height: ${calculateMinSizeBasedOnFigmaWidth(8)};
  }

  ${({ tagType }) => css`
    ${tagType === TAG_TYPE.NORMAL &&
    css`
      padding: ${calculateMinSizeBasedOnFigmaWidth(10)} ${calculateMinSizeBasedOnFigmaWidth(7)}
        ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
    `}

    ${tagType === TAG_TYPE.SMALL &&
    css`
      padding-right: ${calculateMinSizeBasedOnFigmaWidth(6)};
    `}
  `}
`
const StyledTagName = styled.p`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
`
