import { useState, useEffect, KeyboardEventHandler, ChangeEventHandler } from 'react'

type UseTextItemsReturn = {
  value: string
  items: string[]
  isDisabled: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyPress: KeyboardEventHandler<HTMLInputElement>
  onClickAddButton: () => void
  onClickDeleteItemButton: (item: string) => void
}

/**
 * inputタグに文字列を入力してエンターを押すとアイテムが増える仕組みを実装するフック
 * @param {number} maxTextLength - 最大文字数
 * @param {number} maxItems - 最大アイテム数
 * @returns returns
 * @returns returns.value - inputタグのvalue
 * @returns returns.items - 追加したアイテム
 * @returns returns.isDisabled - これ以上アイテムを追加できなくするか
 * @returns returns.onChange
 * @returns returns.onKeyPress
 * @returns returns.onClickAddButton
 * @returns returns.onClickDeleteItemButton
 */
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
    setItems([...items, value])
    setValue('')
  }
  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClickAddButton()
    }
  }
  const onClickDeleteItemButton = (item: string) => {
    const index = items.indexOf(item)
    items.splice(index, 1)
    setItems(items.slice())
  }

  useEffect(() => {
    const shouldDisabled = getShouldDisable(value)
    setIsDisabled(shouldDisabled)
  }, [items])

  return {
    value,
    items,
    isDisabled,
    onChange,
    onKeyPress,
    onClickAddButton,
    onClickDeleteItemButton,
  }
}
