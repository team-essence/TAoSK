import { ChangeEvent, useState } from 'react';

export type UseSelectBoxResult = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const useSelectBox = (initialValue: string): UseSelectBoxResult => {
  const [value, setValue] = useState<string>(initialValue);

  return { value, onChange: (e) => setValue(e.target.value) };
};
