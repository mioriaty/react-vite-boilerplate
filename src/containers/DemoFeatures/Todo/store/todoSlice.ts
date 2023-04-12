import { TodoItem } from '@app/services/Todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  todo: TodoItem[];

  getStatus: Status;
  createStatus: Status;
  updateStatus: Status;
  deleteQueueStatus: string[];
}

export const todoSlice = createSlice({
  initialState: {
    todo: [],
    getStatus: 'idle',
    createStatus: 'idle',
    updateStatus: 'idle',
    deleteQueueStatus: [],
  } as State,
  name: '@todo',
  reducers: {
    // get all
    getTodos: (state, _action: PayloadAction<{ search: string }>) => {
      state.getStatus = 'loading';
    },
    getTodosSucceed: (state, action: PayloadAction<TodoItem[]>) => {
      state.getStatus = 'succeeded';
      state.todo = action.payload;
    },
    getTodosFailed: state => {
      state.getStatus = 'failed';
    },
    // create
    createTodo: (state, _action: PayloadAction<Omit<TodoItem, 'id'>>) => {
      state.createStatus = 'loading';
    },
    createTodoSucceed: (state, action: PayloadAction<TodoItem>) => {
      state.createStatus = 'succeeded';
      state.todo = state.todo.concat(action.payload);
    },
    createTodoFailed: state => {
      state.createStatus = 'failed';
    },
    // update
    updateTodo: state => {
      state.updateStatus = 'loading';
    },
    updateTodoSucceed: (state, action: PayloadAction<TodoItem>) => {
      state.updateStatus = 'succeeded';
      state.todo = state.todo.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    updateTodoFailed: state => {
      state.updateStatus = 'failed';
    },
    // delete
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.deleteQueueStatus = state.deleteQueueStatus.concat(action.payload.id);
    },
    deleteTodoSucceed: (state, action: PayloadAction<{ id: string }>) => {
      state.deleteQueueStatus = state.deleteQueueStatus.filter(id => id !== action.payload.id);
      state.todo = state.todo.filter(item => item.id !== action.payload.id);
    },
    deleteTodoFailed: (state, action: PayloadAction<{ id: string }>) => {
      state.deleteQueueStatus = state.deleteQueueStatus.filter(id => id !== action.payload.id);
    },
  },
});

export const todoSelector = (state: AppState) => state.demos.todo;
