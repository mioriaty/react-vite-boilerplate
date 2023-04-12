import { todoActions } from '@app/containers/DemoFeatures/Todo/store/actions';
import { todoService } from '@app/services/Todo';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';

function* handle({ payload: { active, content } }: ReturnType<typeof todoActions.createTodo>) {
  try {
    const response: SagaReturnType<typeof todoService.createTodo> = yield retry(3, 1000, todoService.createTodo, { todo: { active, content } });
    yield put(todoActions.createTodoSucceed(response));
  } catch (error) {
    yield put(todoActions.createTodoFailed());
  }
}

export function* watchCreateTodo() {
  yield takeLatest(todoActions.createTodo.type, handle);
}
