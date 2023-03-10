import { TodoItem } from '@app/services/Todo';
import { createSlice } from '@reduxjs/toolkit';

import { createTodo, deleteTodos, getTodos, updateTodo } from './thunks';

interface State {
  todo: TodoItem[];

  getStatus: Status;
  createStatus: Status;
  updateQueueStatus: string[];
  deleteQueueStatus: string[];
}

export const todoSlice = createSlice({
  initialState: {
    todo: [],
    getStatus: 'idle',
    createStatus: 'idle',
    deleteQueueStatus: [],
    updateQueueStatus: [],
  } as State,
  name: '@todo',
  reducers: {},
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
    builder.addCase(createTodo.pending, state => {
      state.createStatus = 'loading';
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.createStatus = 'success';
      state.todo = state.todo.concat(action.payload);
    });
    builder.addCase(createTodo.rejected, state => {
      state.createStatus = 'failure';
    });
    builder.addCase(updateTodo.pending, (state, action) => {
      state.updateQueueStatus = state.updateQueueStatus.concat(action.meta.arg.id);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.updateQueueStatus = state.updateQueueStatus.filter(id => id !== action.meta.arg.id);
      state.todo = state.todo.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.updateQueueStatus = state.updateQueueStatus.filter(id => id !== action.meta.arg.id);
    });
  },
});

export const todoSelector = (state: AppState) => state.demos.todo;
