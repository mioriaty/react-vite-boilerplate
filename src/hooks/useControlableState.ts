import { useEffect, useState } from 'react';

type ControllableValue<T> = T | undefined;

interface UseControllableStateProps<T> {
  defaultValue?: T;
  value?: ControllableValue<T>;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({ defaultValue, value, onChange }: UseControllableStateProps<T>): [T | undefined, (value: T) => void] {
  const [stateValue, setStateValue] = useState(defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value);
    }
  }, [value]);

  const handleChange = (newValue: T) => {
    setStateValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return [stateValue, handleChange];
}
