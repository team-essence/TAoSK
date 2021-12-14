import { useState, useEffect, useRef, useCallback, MouseEvent } from 'react'

type UseControllTextAreaReturn = {
  isDisabled: boolean
  textAreaRef: React.RefObject<HTMLTextAreaElement>
  enableTextArea: (e: MouseEvent<HTMLElement>) => void
  disableTextArea: () => void
  makeAllTextSelected: () => void
}

/**
 * テキストエリアへの書き込みを制御する
 *
 * @return {UseControllTextAreaReturn} {
 * isDisabled: テキストエリアの状態,
 * textAreaRef: textareaタグのrefと繋げる,
 * enableTextArea @param{e}: テキストエリアへの書き込みを有効にする,
 * disableTextArea: テキストエリアへの書き込みを無効にする
 * makeAllTextSelected: フォーカス時に全てのテキストを選択状態にする
 * }
 */
export const useControllTextArea = (): UseControllTextAreaReturn => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const enableTextArea = (e: MouseEvent<HTMLElement>) => {
    setIsDisabled(false)
    document.addEventListener('click', disableTextArea)
    e.stopPropagation()
  }

  const disableTextArea = useCallback(() => {
    setIsDisabled(true)
    document.removeEventListener('click', disableTextArea)
  }, [])

  const makeAllTextSelected = () => {
    textAreaRef.current?.select()
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('click', disableTextArea)
    }
  }, [disableTextArea])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [isDisabled])

  return { isDisabled, textAreaRef, enableTextArea, disableTextArea, makeAllTextSelected }
}
