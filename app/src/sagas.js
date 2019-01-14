import { all, fork } from 'redux-saga/effects';
import memberSaga from 'member/member.saga';

const sagas = [memberSaga];

export function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
