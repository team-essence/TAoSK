import { useState, useEffect, KeyboardEventHandler, ChangeEventHandler } from 'react'

type UseTextItemsReturn = {
  value: string
  items: string[]
  isDisabled: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyPress: KeyboardEventHandler<HTMLInputElement>
  onClickAddButton: () => void
  onClickCrossButton: (item: string) => void
}

export const useTextItems = (maxTextLength: number, maxItems: number): UseTextItemsReturn => {
  const [items, setItems] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const getShouldDisable = (value: string) => {
    const isAlreadyExists = !!items.find(v => v === value)
    const isOver = value.length > maxTextLength || items.length >= maxItems
    return !value.trim() || !!isAlreadyExists || isOver
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
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
  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
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

  return { value, items, isDisabled, onChange, onKeyPress, onClickAddButton, onClickCrossButton }
}
