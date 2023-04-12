import { watchCreateTodo } from '@app/containers/DemoFeatures/Todo/store/sagas/watchCreateTodo';
import { watchGetTodos } from '@app/containers/DemoFeatures/Todo/store/sagas/watchGetTodos';

export const sagaTodos = [watchGetTodos, watchCreateTodo];
