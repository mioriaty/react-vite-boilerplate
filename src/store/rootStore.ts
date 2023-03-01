import { sliceError } from '@app/containers/ErrorPage';
import { sliceHomePage } from '@app/containers/HomePage/store/sliceHomePage';
import { chatSlice } from '@app/containers/SocketConntector';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

import { socketMiddleware } from './middlewares/socketMiddleware';

const _isDev = import.meta.env.NODE_ENV === 'development';

const _composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 });

export const store = configureStore({
  middleware: [logger, socketMiddleware],
  reducer: {
    home: sliceHomePage.reducer,
    error: sliceError.reducer,
    socketConnector: combineReducers({
      chat: chatSlice.reducer,
    }),
  },
});

export type Reducers = ReturnType<typeof store.getState>;

export type ActionTypes = CombineSliceActions<typeof sliceHomePage.actions>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<Reducers> = useSelector;
