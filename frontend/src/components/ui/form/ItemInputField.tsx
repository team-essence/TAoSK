import React, { FC, useEffect, Dispatch } from 'react'
import styled, { css } from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { InputItem } from 'components/ui/form/InputItem'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { useTextItems } from 'hooks/useTextItems'
import { theme } from 'styles/theme'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { max } from 'consts/certificationsAndInterests'

type InputAspectStyles = Record<'width' | 'height', string>
type Props = {
  className?: string
  label: string
  placeholder?: string
  inputAspect: InputAspectStyles
  items: string[]
  setItems: Dispatch<React.SetStateAction<string[]>>
}

export const ItemInputField: FC<Props> = props => {
  const { className, label, placeholder, inputAspect, setItems } = props
  const {
    value,
    items,
    isDisabled,
    onChange,
    onKeyPress,
    onClickAddButton,
    onClickDeleteItemButton,
  } = useTextItems(max.TEXT_LENGTH, max.ITEMS)

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
          value={value}
          onKeyPress={onKeyPress}
          onChange={onChange}
          placeholder={placeholder}
          {...inputAspect}
        />
        <StyledCoarseButton text="追加" onClick={onClickAddButton} disabled={isDisabled} />
      </StyledRow>
      <StyledItemsWrapper width={inputAspect.width}>
        {items.map((item, index) => (
          <InputItem itemName={item} key={index} onClick={() => onClickDeleteItemButton(item)} />
        ))}
      </StyledItemsWrapper>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
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
  color: ${({ isMax }) => isMax && theme.COLORS.ERROR};
`
const StyledInput = styled.input<InputAspectStyles>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding-left: ${calculateMinSizeBasedOnFigma(8)};
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.WHITE, 0.7)};
  border: solid 1px ${({ theme }) => theme.COLORS.CHOCOLATE};
  border-radius: 2px;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  }
`
const StyledItemsWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${calculateMinSizeBasedOnFigma(12)};
  margin-top: ${calculateMinSizeBasedOnFigma(12)};
  width: ${({ width }) => width};
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
