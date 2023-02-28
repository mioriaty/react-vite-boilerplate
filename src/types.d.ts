import { Reducers } from './store/rootStore';

declare global {
  declare type AppState = Reducers;

  declare type CombineSliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
  }[keyof T];
}
