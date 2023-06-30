import classNames from '@app/utils/functions/classNames';
import { useTheme } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import type { GroupBase, InputProps, MultiValue, Props, SingleValue } from 'react-select';
import ReactSelect, { components } from 'react-select';

export type SelectProps<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = Props<Option, IsMulti, Group>;

export const InputComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({
  inputClassName,
  ...props
}: InputProps<Option, IsMulti, Group>) => {
  return (
    <components.Input
      // disables our default form focus hightlight on the react-select input element
      inputClassName={classNames('focus:ring-0 focus:ring-offset-0', inputClassName)}
      {...props}
    />
  );
};

export function Select<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>({
  className,
  ...props
}: SelectProps<Option, IsMulti, Group>) {
  const [mounted, setMounted] = useState<boolean>(false);
  const { colors } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <input type="text" className={className} />;
  }

  return (
    <ReactSelect
      theme={theme => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: colors.primary,
        },
      })}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? colors.gray9 : colors.dark,
          ':active': {
            backgroundColor: state.isSelected ? '' : colors.light,
            color: colors.gray9,
          },
        }),
      }}
      components={{
        ...components,
        IndicatorSeparator: () => null,
        Input: InputComponent,
      }}
      className={classNames('border-0 text-sm', className)}
      {...props}
    />
  );
}

export function SelectWithValidation<
  Option extends { label: string; value: string },
  isMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ required = false, onChange, value, ...remainingProps }: SelectProps<Option, isMulti, Group> & { required?: boolean }) {
  const [hiddenInputValue, setHiddenInputValue] = useState(() => {
    if (value instanceof Array || !value) {
      return;
    }
    return value.value || '';
  });

  const handleSetHiddenInputValue = useCallback((value: MultiValue<Option> | SingleValue<Option>) => {
    let _hiddenInputVal = '';
    if (value instanceof Array) {
      _hiddenInputVal = value.map(val => val.value).join(',');
    } else {
      _hiddenInputVal = value?.value || '';
    }
    setHiddenInputValue(_hiddenInputVal);
  }, []);

  useEffect(() => {
    if (!value) {
      return;
    }
    handleSetHiddenInputValue(value);
  }, [value, handleSetHiddenInputValue]);

  return (
    <div className={classNames('relative', remainingProps.className)}>
      <Select
        value={value}
        {...remainingProps}
        onChange={(value, ...remainingArgs) => {
          handleSetHiddenInputValue(value);
          if (onChange) {
            onChange(value, ...remainingArgs);
          }
        }}
      />
      {required && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{
            opacity: 0,
            width: '100%',
            height: 1,
            position: 'absolute',
          }}
          value={hiddenInputValue}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          // TODO:Not able to get focus to work
          // onFocus={() => selectRef.current?.focus()}
          required={required}
        />
      )}
    </div>
  );
}
