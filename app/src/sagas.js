import { all, fork } from 'redux-saga/effects';
import detailsSaga from 'details/details.saga';

const sagas = [detailsSaga];

export function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
