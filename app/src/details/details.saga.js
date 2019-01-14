import { put, select, all, fork, call, takeLatest } from 'redux-saga/effects';
import { getInfoDetails } from 'selectors';
import { setDetailsData } from 'details/details';
import { setMemberData } from 'member/member';
import API from 'api.service';

const ENTITIES_WITH_DETAILS = ['member'];

function* fetchDetailsOnNavigationToInfo() {
  function* onNavigationToInfo(action) {
    const { level, id } = action.payload;
    const entityItem = yield select(state => state[level].data[id]);
    const entityItemAction = { member: setMemberData }[level];
    if (!entityItem && entityItemAction) {
      const entityItemData = yield call(API, `${level}s/${id}`);
      put(entityItemAction(entityItemData));
    }
    if (ENTITIES_WITH_DETAILS.includes(level)) {
      const entry = yield select(getInfoDetails);
      if (entry === null) {
        const details = yield call(API, 'details');
        yield put(setDetailsData(details));
      }
    }
  }

  yield takeLatest('INFO_ROUTE', onNavigationToInfo);
}

export default function* detailsSaga() {
  const sagas = [
    fetchDetailsOnNavigationToInfo
  ];
  yield all(sagas.map(saga => fork(saga)));
}
