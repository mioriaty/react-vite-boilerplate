import { createState } from '@app/utils/functions/createState';
import { delay } from '@app/utils/functions/delay';
import { v4 } from 'uuid';

import { TodoItem } from './@types';

export const initState: TodoItem[] = [
  {
    id: v4(),
    active: false,
    content: 'todo 1',
  },
];

const todoState = createState<TodoItem[]>(initState, { stateName: '__TODO__', useLocalStorage: true });

export class TodoService {
  async getTodos() {
    await delay(300);
    return todoState.getState();
  }

  async createTodo({ todo }: { todo: Omit<TodoItem, 'id'> }) {
    await delay(300);
    const newTodo: TodoItem = {
      id: v4(),
      ...todo,
    };
    todoState.setState(prevState => [...prevState, newTodo]);
    return newTodo;
  }

  async deleteOne({ id }: { id: TodoItem['id'] }) {
    await delay(300);
    return todoState.setState(prevState => prevState.filter(item => item.id !== id));
  }

  async deleteMany({ ids }: { ids: TodoItem['id'][] }) {
    await delay(300);
    return todoState.setState(prevState => prevState.filter(item => !ids.includes(item.id)));
  }

  async updateTodo({ todo }: { todo: TodoItem }) {
    await delay(300);
    return todoState.setState(prevState => {
      const updatedTodo = prevState.map(item => {
        if (item.id === todo.id) {
          return todo;
        }
        return item;
      });

      return updatedTodo;
    });
  }
}
