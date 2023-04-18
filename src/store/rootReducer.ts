import { todoSlice } from '@app/containers/DemoFeatures/Todo';
import { invoiceSlice } from '@app/containers/Invoice/store';
import { sliceError } from '@app/pages/ErrorPage';
import { sliceHomePage } from '@app/pages/HomePage/store/sliceHomePage';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = {
  home: sliceHomePage.reducer,
  error: sliceError.reducer,
  demos: combineReducers({
    todo: todoSlice.reducer,
  }),
  invoice: invoiceSlice.reducer,
};
