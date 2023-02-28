import { PathRouteProps } from 'react-router-dom';

export interface LocationState {
  '/'?: undefined;
  '/iframe'?: undefined;
}

export type PathName = keyof LocationState;

export interface AppPages extends Omit<PathRouteProps, 'path'> {
  path: PathName;
}
