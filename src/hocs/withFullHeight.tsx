import { useFullHeight } from '@app/hooks/useFullHeight';
import { ComponentType, FC } from 'react';

export const withFullHeight = <P,>(Component: ComponentType<P>) => {
  const WithFullHeight: FC<P> = props => {
    const ref = useFullHeight();
    return <Component {...(props as any)} ref={ref}></Component>;
  };

  const wrappedComponentName = WithFullHeight.displayName || Component.name || 'Component';

  WithFullHeight.displayName = `withFullHeight(${wrappedComponentName})`;

  return WithFullHeight;
};
