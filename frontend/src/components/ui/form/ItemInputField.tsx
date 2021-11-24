import React, { FC, useState, useEffect, Dispatch, KeyboardEvent, ChangeEvent } from 'react'
import styled from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { InputItem } from 'components/ui/form/InputItem'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'

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
  const { className, label, placeholder, inputAspect, items, setItems } = props
  const [value, setValue] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const MAX_TEXT_LENGTH = 50
  const MAX_ITEMS = 20

  const getShouldDisable = (value: string) => {
    const isAlreadyExists = !!items.find(v => v === value)
    const isOver = value.length > MAX_TEXT_LENGTH || items.length >= MAX_ITEMS
    return !value.trim() || !!isAlreadyExists || isOver
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const shouldDisabled = getShouldDisable(newValue)
    setIsDisabled(shouldDisabled)
    setValue(newValue)
  }
  const onClickAddButton = () => {
    if (isDisabled) return
    items.push(value)
    setItems(items.slice())
    setValue('')
  }
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClickAddButton()
    }
  }
  const onClickCrossButton = (item: string) => {
    const index = items.indexOf(item)
    items.splice(index, 1)
    setItems(items.slice())
  }

  useEffect(() => {
    const shouldDisabled = getShouldDisable(value)
    setIsDisabled(shouldDisabled)
  }, [items])

  return (
    <StyledWrapper className={className}>
      {label}
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
          <InputItem itemName={item} key={index} onClick={() => onClickCrossButton(item)} />
        ))}
      </StyledItemsWrapper>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
`
const StyledInput = styled.input<InputAspectStyles>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding-left: 8px;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.WHITE, 0.7)};
  border: solid 1px ${({ theme }) => theme.COLORS.CHOCOLATE};
  border-radius: 2px;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY};
  }
`
const StyledItemsWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 12px;
  width: ${({ width }) => width};
`
