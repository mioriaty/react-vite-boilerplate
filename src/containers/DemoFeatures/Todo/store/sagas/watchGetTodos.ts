import { todoActions } from '@app/containers/DemoFeatures/Todo/store/actions';
import { todoService } from '@app/services/Todo';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';

function* fetchTodos(_: ReturnType<typeof todoActions.getTodos>) {
  try {
    const response: SagaReturnType<typeof todoService.getTodos> = yield retry(3, 1000, todoService.getTodos);
    yield put(todoActions.getTodosSucceed(response));
  } catch (error) {
    yield put(todoActions.getTodosFailed());
  }
}

export function* watchGetTodos() {
  yield takeLatest(todoActions.getTodos.type, fetchTodos);
}
