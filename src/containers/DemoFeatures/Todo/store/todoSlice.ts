import { TodoItem } from '@app/services/Todo';
import { createSlice } from '@reduxjs/toolkit';

import { createTodo, getTodos, updateTodo } from './thunks';

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
    builder
      .addCase(getTodos.pending, state => {
        state.getStatus = 'loading';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.getStatus = 'succeeded';
        state.todo = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.getStatus = 'idle';
        } else {
          state.getStatus = 'failed';
        }
      })
      .addCase(createTodo.pending, state => {
        state.createStatus = 'loading';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.todo = state.todo.concat(action.payload);
      })
      .addCase(createTodo.rejected, state => {
        state.createStatus = 'failed';
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.updateQueueStatus = state.updateQueueStatus.concat(action.meta.arg.id);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateQueueStatus = state.updateQueueStatus.filter(id => id !== action.meta.arg.id);
        state.todo = state.todo.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.updateQueueStatus = state.updateQueueStatus.filter(id => id !== action.meta.arg.id);
      });
  },
});

// export const {} = todoSlice.actions;

export const todoSelector = (state: AppState) => state.demos.todo;
