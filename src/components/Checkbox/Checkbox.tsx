import { GroupContext } from '@app/components/Checkbox/CheckboxGroup';
import classNames from '@app/utils/functions/classNames';
import { forwardRef, ForwardRefRenderFunction, useContext, useEffect, useRef } from 'react';

import { CheckboxProps } from './types';

const _Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { className, rootClassName, children, indeterminate = false, style, onMouseEnter, onMouseLeave, skipGroup = false, disabled, ...restProps },
  ref,
) => {
  const checkboxGroup = useContext(GroupContext);
  const mergedDisabled = checkboxGroup?.disabled || disabled;

  const prevValue = useRef(restProps.value);

  useEffect(() => {
    checkboxGroup?.registerValue(restProps.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup?.cancelValue(prevValue.current);
      checkboxGroup?.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }

    return () => {
      checkboxGroup?.cancelValue(restProps.value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restProps.value]);

  const checkboxProps: CheckboxProps = {
    ...restProps,
  };
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange(...args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({ label: children, value: restProps.value });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value?.includes(restProps.value);
  }

  const classString = classNames(
    `checkbox-wrapper-checked-${checkboxProps.checked}`,
    `checkbox-wrapper-disabled-${mergedDisabled}`,
    className,
    rootClassName,
  );

  const checkboxClass = classNames(`checkbox-indeterminate-${indeterminate}`);
  const ariaChecked = indeterminate ? 'mixed' : undefined;

  return (
    <label className={classString} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <input type="checkbox" aria-checked={ariaChecked} {...(checkboxProps as any)} className={checkboxClass} disabled={mergedDisabled} ref={ref} />
      {children !== undefined && <span>{children}</span>}
    </label>
  );
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(_Checkbox);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
