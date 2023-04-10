import { sliceHomePage } from '@app/containers/HomePage/store/sliceHomePage';
import { rootReducer } from '@app/store/rootReducer';
import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

const isDev = process.env.NODE_ENV === 'dev';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger, sagaMiddleware),
  reducer: rootReducer,
  devTools: isDev,
});

sagaMiddleware.run(rootSaga);

export type Reducers = ReturnType<typeof store.getState>;

export type ActionTypes = CombineSliceActions<typeof sliceHomePage.actions>;

export type AppThunkDispatch = ThunkDispatch<Reducers, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<Reducers> = useSelector;
