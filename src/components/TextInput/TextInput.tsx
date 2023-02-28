import { ChangeEvent, FC } from 'react';

type Size = 'small' | 'medium' | 'large';

export interface TextInputProps {
  size?: 'small' | 'medium' | 'large';
  value?: string;
  onValueChange?: (value: string) => void;
}

const mappingSize: Record<Size, string> = {
  small: '4px 8px',
  medium: '6px 12px',
  large: '8px 14px',
};

export const TextInput: FC<TextInputProps> = ({ size = 'small', value, onValueChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };
  return <input type="text" value={value} onChange={handleChange} style={{ padding: mappingSize[size] }} />;
};