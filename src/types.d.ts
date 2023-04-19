import { Reducers } from './store/rootStore';

declare global {
  declare type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

  declare type Size = 'extra-small' | 'small' | 'medium' | 'large';

  declare type AppState = Reducers;

  declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

  declare type CombineSliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
  }[keyof T];
}
