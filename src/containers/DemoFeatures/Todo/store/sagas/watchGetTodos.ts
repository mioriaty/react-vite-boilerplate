import { todoService } from '@app/services/Todo';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getTodos } from '../thunks';

function* fetchTodos(_: ReturnType<typeof getTodos.pending>) {
  try {
    const response: SagaReturnType<typeof todoService.getTodos> = yield retry(3, 1000, todoService.getTodos);
    console.log(response);

    // yield put(getTodos.fulfilled(response, '', { search: '' }));
  } catch (error) {
    // yield put(getTodos.rejected);
  }
}

export function* watchGetTodos() {
  yield takeLatest(getTodos.pending.type, fetchTodos);
}
