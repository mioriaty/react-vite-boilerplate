import { TodoItem } from '@app/services/Todo';
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

import { getTodos } from './thunks';

interface State {
  todo: TodoItem[];
  getStatus: Status;
  searchKey: string;
}

export const todoSlice = createSlice({
  initialState: {
    todo: [],
    getStatus: 'idle',
    searchKey: '',
  } as State,
  name: '@todo',
  reducers: {
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodos.pending, state => {
      state.getStatus = 'loading';
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.getStatus = 'success';
      state.todo = action.payload;
    });
    builder.addCase(getTodos.rejected, state => {
      state.getStatus = 'failure';
    });
  },
});

export const { setSearchKey } = todoSlice.actions;

export const todoSelector = (state: AppState) => state.demos.todo;
