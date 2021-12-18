import { useState, useMemo, useEffect, useRef, ComponentProps } from 'react'
import { MyPageEditTagsModal } from 'components/models/myPage/MyPageEditTagsModal'
import { max } from 'consts/certificationsAndInterests'

type UseMyPageEditTagModalReturn = Pick<
  ComponentProps<typeof MyPageEditTagsModal>,
  'items' | 'setItems' | 'disabled' | 'shouldShow' | 'setShouldShow'
>

const getShouldDisabled = (initialItems: string[], items: string[]) =>
  JSON.stringify(initialItems.sort()) === JSON.stringify(items.sort()) ||
  items.length > max.ITEMS ||
  !!items.find(v => v.length > max.TEXT_LENGTH)

/**
 * マイページの資格・興味編集モーダルで使う情報を設定する
 */
export const useMyPageEditTagModal = (initialItems: string[]): UseMyPageEditTagModalReturn => {
  const [items, setItems] = useState<string[]>(initialItems)
  const [shouldShow, setShouldShow] = useState<boolean>(false)
  const disabled = useMemo(() => getShouldDisabled(initialItems, items), [initialItems, items])
  const shouldInitializeRef = useRef<boolean>(true)

  useEffect(() => {
    if (initialItems.length && shouldInitializeRef.current) {
      setItems([...initialItems])
      shouldInitializeRef.current = false
    }
  }, [initialItems])

  return { items, setItems, disabled, shouldShow, setShouldShow }
}
