import { ComponentType, FC, useEffect, useRef, useState } from 'react';

interface WithDebounceProps<IProps> {
  WrappedComponent: ComponentType<IProps>;
  propValue: keyof IProps;
  propOnChange: keyof IProps;
  time?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const withDebounce = <IProps extends any>({ WrappedComponent, propValue, propOnChange, time = 200 }: WithDebounceProps<IProps>) => {
  const WithDebounce: FC<IProps> = props => {
    const timeIdRef = useRef(-1);
    const [mounted, setMounted] = useState(false);
    const [valueState, setValueState] = useState(props[propValue]);

    useEffect(() => {
      setValueState(props[propValue]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props[propValue]]);

    useEffect(() => {
      if (mounted) {
        clearTimeout(timeIdRef.current);
        timeIdRef.current = window.setTimeout(() => {
          (props as any)[propOnChange]?.(valueState);
        }, time);
      }
      setMounted(true);
      return () => {
        clearTimeout(timeIdRef.current);
        setMounted(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueState]);

    const handleChange = (value: any) => {
      setValueState(value);
    };

    return <WrappedComponent {...(props as any)} {...{ [propOnChange]: handleChange, [propValue]: valueState }} />;
  };

  return WithDebounce;
};
