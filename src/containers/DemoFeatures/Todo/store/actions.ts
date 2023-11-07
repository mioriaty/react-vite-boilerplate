import { todoSlice } from '@app/containers/DemoFeatures/Todo/store/todoSlice';
import { todoService } from '@app/services/Todo';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const todoActions = todoSlice.actions;

export const getTodosWithThunk = createAsyncThunk('@todo/getTodosWithThunk', async (search: string) => {
  try {
    const response = await todoService.getTodos(search);
    return response;
  } catch (error) {
    console.log(error);
  }
});
