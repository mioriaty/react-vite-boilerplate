import { sliceError } from '@app/containers/ErrorPage';
import { sliceHomePage } from '@app/containers/HomePage/store/sliceHomePage';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

const isDev = import.meta.env.NODE_ENV === 'development';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 });

export const store = configureStore({
  middleware: [logger],
  reducer: {
    home: sliceHomePage.reducer,
    error: sliceError.reducer,
  },
});

export type Reducers = ReturnType<typeof store.getState>;

export type ActionTypes = CombineSliceActions<typeof sliceHomePage.actions>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<Reducers> = useSelector;
