import { todoSlice } from '@app/containers/DemoFeatures/Todo';
import { sliceError } from '@app/containers/ErrorPage';
import { sliceHomePage } from '@app/containers/HomePage/store/sliceHomePage';
import { chatSlice } from '@app/containers/SocketConntector';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = {
  home: sliceHomePage.reducer,
  error: sliceError.reducer,
  socketConnector: combineReducers({
    chat: chatSlice.reducer,
  }),
  demos: combineReducers({
    todo: todoSlice.reducer,
  }),
};
