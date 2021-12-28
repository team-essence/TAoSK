import { ChangeEvent, useEffect, useState } from 'react'

export type UseInputResult = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

/**
 * inputの入力内容を監視
 *
 * @param {string} initialValue
 * @return {UseInputResult} value,onChange
 */
export const useInput = (initialValue: string): UseInputResult => {
  const [value, setValue] = useState<string>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
  }
}
