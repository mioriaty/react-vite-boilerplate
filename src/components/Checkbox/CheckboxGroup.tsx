import { CheckboxGroupProps, CheckboxOptionType, CheckboxValueType } from '@app/components/Checkbox/types';
import classNames from '@app/utils/functions/classNames';
import { omit } from 'lodash';
import { createContext, forwardRef, ForwardRefRenderFunction, memo, useEffect, useState } from 'react';

import Checkbox from './Checkbox';

export interface CheckboxGroupContext {
  name?: string;
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
  registerValue: (val: string) => void;
  cancelValue: (val: string) => void;
}

export const GroupContext = createContext<CheckboxGroupContext | null>(null);

const _CheckboxGroup: ForwardRefRenderFunction<HTMLDivElement, CheckboxGroupProps> = (
  { defaultValue, children, options = [], className, rootClassName, style, value: valueProp, onChange, ...restProps },
  ref,
) => {
  const [value, setValue] = useState<CheckboxValueType[]>(valueProp || defaultValue || []);
  const [registeredValues, setRegisteredValues] = useState<CheckboxValueType[]>([]);

  useEffect(() => {
    if (valueProp) {
      setValue(valueProp || []);
    }
  }, [valueProp]);

  const getOptions = () => {
    return options.map(option => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  };

  const cancelValue = (val: string) => {
    setRegisteredValues(prevVal => prevVal.filter(pre => pre !== val));
  };

  const registerValue = (val: string) => {
    setRegisteredValues(prev => [...prev, val]);
  };

  const toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = value.indexOf(option.value);
    const newValue = [...value];
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!valueProp) {
      setValue(newValue);
    }
    const opts = getOptions();
    onChange?.(
      newValue
        .filter(val => registeredValues.includes(val))
        .sort((a, b) => {
          const indexA = opts.findIndex(opt => opt.value === a);
          const indexB = opts.findIndex(opt => opt.value === b);
          return indexA - indexB;
        }),
    );
  };

  const domProps = omit(restProps, ['value', 'disabled']);

  if (options && options.length > 0) {
    children = getOptions().map(option => (
      <Checkbox
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : restProps.disabled}
        value={option.value}
        checked={value.includes(option.value)}
        onChange={option.onChange}
        className={`checkbox-item`}
        style={option.style}
      >
        {option.label}
      </Checkbox>
    ));
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,
    registerValue,
    cancelValue,
  };
  const classString = classNames(className, rootClassName);

  return (
    <div className={classString} style={style} {...domProps} ref={ref}>
      <GroupContext.Provider value={context}>{children}</GroupContext.Provider>
    </div>
  );
};

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(_CheckboxGroup);

export default memo(CheckboxGroup);
