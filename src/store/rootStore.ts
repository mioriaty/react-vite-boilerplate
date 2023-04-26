import { rootReducer } from '@app/store/rootReducer';
import { AnyAction, combineReducers, configureStore, Middleware, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const reducers = persistReducer(persistConfig, combineReducers({ ...rootReducer }));

const sagaMiddleware = createSagaMiddleware();
const middleware: Middleware[] = [sagaMiddleware, logger];

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(middleware),
  reducer: reducers,
  devTools: true,
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store as any);

export type Reducers = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<Reducers, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<Reducers> = useSelector;
