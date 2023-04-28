import { Reducers } from './store/rootStore';

declare global {
  declare type AppState = Reducers;

  declare type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

  declare type Size = 'extra-small' | 'small' | 'medium' | 'large';

  // yêu cầu có các key chỉ định trong Partial<T>
  declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
}
