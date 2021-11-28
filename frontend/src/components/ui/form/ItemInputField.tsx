import React, { FC, useEffect, Dispatch } from 'react'
import styled from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { InputItem } from 'components/ui/form/InputItem'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { useTextItems } from 'hooks/useTextItems'
import { theme } from 'styles/theme'
import { generateStyleBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
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
        <CoarseButton
          text="追加"
          aspect={{
            width: '64px',
            height: '40px',
          }}
          outerBgColor={
            isDisabled
              ? convertIntoRGBA(theme.COLORS.ALTO, 0.55)
              : convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)
          }
          innerBgColor={
            isDisabled
              ? convertIntoRGBA(theme.COLORS.NOBEL, 0.64)
              : convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)
          }
          color={isDisabled ? theme.COLORS.SILVER : theme.COLORS.BRANDY}
          onClick={onClickAddButton}
          isDisabled={isDisabled}
        />
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
  ${generateStyleBasedOnFigma`
    gap: 16px;
    margin-top: 4px;
  `}
`
const StyledItemsNum = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  ${generateStyleBasedOnFigma`
    padding-left: 8px;
  `}
`
const StyledMaxItems = styled.span<{ isMax: boolean }>`
  color: ${({ isMax }) => isMax && theme.COLORS.ERROR};
`
const StyledInput = styled.input<InputAspectStyles>`
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.WHITE, 0.7)};
  border: solid 1px ${({ theme }) => theme.COLORS.CHOCOLATE};
  border-radius: 2px;
  ${({ width, height }) => generateStyleBasedOnFigma`
    width: ${width};
    height: ${height};
    padding-left: 8px;
  `}
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  }
`
const StyledItemsWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  ${({ width }) => generateStyleBasedOnFigma`
    gap: 12px;
    margin-top: 12px;
    width: ${width};
  `}
`
