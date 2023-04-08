import { todoSlice } from '@app/containers/DemoFeatures/Todo';
import { sliceError } from '@app/containers/ErrorPage';
import { sliceHomePage } from '@app/containers/HomePage/store/sliceHomePage';
import { chatSlice } from '@app/containers/SocketConntector';
import { AnyAction, combineReducers, configureStore, getDefaultMiddleware, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

const isDev = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  middleware: [...getDefaultMiddleware(), logger, sagaMiddleware],
  reducer: {
    home: sliceHomePage.reducer,
    error: sliceError.reducer,
    socketConnector: combineReducers({
      chat: chatSlice.reducer,
    }),
    demos: combineReducers({
      todo: todoSlice.reducer,
    }),
  },
  devTools: isDev,
});

sagaMiddleware.run(rootSaga);

export type Reducers = ReturnType<typeof store.getState>;

export type ActionTypes = CombineSliceActions<typeof sliceHomePage.actions>;

export type AppThunkDispatch = ThunkDispatch<Reducers, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<Reducers> = useSelector;
