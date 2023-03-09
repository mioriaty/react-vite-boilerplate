import { todoService } from '@app/services/Todo';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTodos = createAsyncThunk('@todo/getTodos', async () => {
  const response = await todoService.getTodos();
  return response;
});
