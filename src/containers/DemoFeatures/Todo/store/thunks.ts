import { TodoItem, todoService } from '@app/services/Todo';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTodos = createAsyncThunk('@todo/getTodos', async ({ search }: { search?: string }) => {
  const response = await todoService.getTodos();
  return response;
});

export const createTodo = createAsyncThunk('@todo/createTodo', async ({ active, content }: Omit<TodoItem, 'id'>) => {
  const response = await todoService.createTodo({ todo: { active, content } });
  return response;
});

export const updateTodo = createAsyncThunk('@todo/updateTodo', async (todo: TodoItem) => {
  await todoService.updateTodo({ todo });
  return todo;
});

export const deleteTodos = createAsyncThunk('@todo/deleteTodos', async ({ ids }: { ids: string[] }) => {
  return todoService.deleteMany({ ids });
});
