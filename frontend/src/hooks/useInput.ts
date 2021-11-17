import { ChangeEvent, useState } from 'react'

export type UseInputResult = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export const useInput = (initialValue: string): UseInputResult => {
  const [value, setValue] = useState<string>(initialValue)

  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
  }
}
