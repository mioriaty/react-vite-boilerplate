import { todoSlice } from '@app/containers/DemoFeatures/Todo';
import { chatSlice } from '@app/containers/SocketConntector';
import { sliceError } from '@app/pages/ErrorPage';
import { sliceHomePage } from '@app/pages/HomePage/store/sliceHomePage';
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
