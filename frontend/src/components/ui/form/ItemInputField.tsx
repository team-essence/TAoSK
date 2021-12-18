import React, { FCX, useEffect, Dispatch } from 'react'
import styled, { css } from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { Tag, TAG_TYPE } from 'components/ui/tag/Tag'
import { useTextItems } from 'hooks/useTextItems'
import { useWatchElementAspect } from 'hooks/useWatchElementAspect'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { max } from 'consts/certificationsAndInterests'

type Props = {
  label: string
  placeholder?: string
  items: string[]
  setItems: Dispatch<React.SetStateAction<string[]>>
}

export const ItemInputField: FCX<Props> = ({ className, label, placeholder, setItems }) => {
  const {
    value,
    items,
    isDisabled,
    onChange,
    onKeyPress,
    onClickAddButton,
    onClickDeleteItemButton,
  } = useTextItems(max.TEXT_LENGTH, max.ITEMS)
  const { sizeInspectedEl, width } = useWatchElementAspect<HTMLInputElement>()

  useEffect(() => {
    setItems(items.slice())
  }, [setItems, items])

  return (
    <StyledWrapper className={className}>
      {label}
      <StyledItemsNum>
        <StyledMaxItems isMax={items.length === max.ITEMS}>{items.length}</StyledMaxItems>/
        {max.ITEMS}
      </StyledItemsNum>
      <StyledRow>
        <StyledInput
          ref={sizeInspectedEl}
          value={value}
          onKeyPress={onKeyPress}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={17}
        />
        <StyledCoarseButton text="追加" onClick={onClickAddButton} disabled={isDisabled} />
      </StyledRow>

      <StyledItemsWrapper width={width}>
        {items.map((item, index) => (
          <Tag
            name={item}
            tagType={TAG_TYPE.SMALL}
            key={index}
            onClick={() => onClickDeleteItemButton(item)}
          />
        ))}
      </StyledItemsWrapper>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  ${({ theme }) =>
    css`
      color: ${theme.COLORS.CHOCOLATE};
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    `}
`
const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(16)};
  margin-top: ${calculateMinSizeBasedOnFigma(4)};
`
const StyledItemsNum = styled.span`
  padding-left: ${calculateMinSizeBasedOnFigma(8)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
`
const StyledMaxItems = styled.span<{ isMax: boolean }>`
  color: ${({ isMax, theme }) => isMax && theme.COLORS.ERROR};
`
const StyledInput = styled.input`
  padding-left: ${calculateMinSizeBasedOnFigma(8)};
  border-radius: 2px;
  ${({ theme }) =>
    css`
      border: solid 1px ${theme.COLORS.CHOCOLATE};
      background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.7)};

      &::placeholder {
        color: ${theme.COLORS.GRAY};
        font-size: ${theme.FONT_SIZES.SIZE_14};
      }
    `}
`
const StyledItemsWrapper = styled.div<{ width: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${calculateMinSizeBasedOnFigma(12)};
  margin-top: ${calculateMinSizeBasedOnFigma(12)};
  width: ${({ width }) => width}px;
`

type Disabled = { disabled: boolean }
const StyledCoarseButton = styled(CoarseButton).attrs<Disabled>(({ disabled }) => ({
  disabled,
}))<Disabled>`
  width: ${calculateMinSizeBasedOnFigma(64)};
  height: ${calculateMinSizeBasedOnFigma(40)};
  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        color: ${theme.COLORS.SILVER};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.ALTO, 0.55)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.NOBEL, 0.64)};
          }
        }
      `
    } else {
      return css`
        color: ${theme.COLORS.BRANDY};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)};
          }
        }
      `
    }
  }}
`
