import { ChangeEvent, useState } from 'react';

export type UseInputResult = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useInput = (initialValue: string): UseInputResult => {
  const [value, setValue] = useState<string>(initialValue);

  return { value, onChange: (e) => setValue(e.target.value) };
};