import { useState, useMemo, useEffect, useRef, ComponentProps } from 'react'
import { MyPageEditTagsModal } from 'components/models/myPage/MyPageEditTagsModal'
import { max } from 'consts/certificationsAndInterests'

type UseMyPageEditTagModalReturn = Pick<
  ComponentProps<typeof MyPageEditTagsModal>,
  'items' | 'setItems' | 'disabled'
>

const getShouldDisabled = (initialItems: string[], items: string[]) =>
  JSON.stringify(initialItems.sort()) === JSON.stringify(items.sort()) ||
  items.length > max.ITEMS ||
  !!items.find(v => v.length > max.TEXT_LENGTH)

export const useMyPageEditTagModal = (initialItems: string[]): UseMyPageEditTagModalReturn => {
  const [items, setItems] = useState<string[]>(initialItems)
  const disabled = useMemo(() => getShouldDisabled(initialItems, items), [initialItems, items])
  const shouldInitializeRef = useRef<boolean>(true)

  useEffect(() => {
    if (initialItems.length && shouldInitializeRef.current) {
      setItems([...initialItems])
      shouldInitializeRef.current = false
    }
  }, [initialItems])

  return { items, setItems, disabled }
}
