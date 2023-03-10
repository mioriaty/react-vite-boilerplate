import { useFullHeight } from '@app/hooks/useFullHeight';
import { ComponentType, FC } from 'react';

export const withFullHeight = <P,>(Component: ComponentType<P>) => {
  const WithFullHeight: FC<P> = props => {
    const ref = useFullHeight();
    return <Component {...(props as any)} ref={ref}></Component>;
  };

  return WithFullHeight;
};
