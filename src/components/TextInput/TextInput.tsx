import { ChangeEvent, FC, HTMLProps } from 'react';

type Size = 'small' | 'medium' | 'large';

export interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  value?: string;
  innerRef?: React.RefObject<HTMLInputElement>;
  onValueChange?: (value: string) => void;
}

const mappingSize: Record<Size, string> = {
  small: '4px 8px',
  medium: '6px 12px',
  large: '8px 14px',
};

export const TextInput: FC<TextInputProps> = ({ size = 'small', value, onValueChange, innerRef }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };
  return <input type="text" value={value} onChange={handleChange} ref={innerRef} css={{ padding: mappingSize[size] }} />;
};
