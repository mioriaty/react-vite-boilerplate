import { sagaTodos } from '@app/containers/DemoFeatures/Todo';
import { all, call, delay, spawn } from 'redux-saga/effects';

const sagas = [...sagaTodos];

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga: any) => {
  return function* () {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (error) {
          console.error('Saga error, the saga will be restarted', error);
        }
        yield delay(1000);
      }
    });
  };
};

const rootSagas = sagas.map(makeRestartable);

export default function* root() {
  yield all(rootSagas.map(call));
}
