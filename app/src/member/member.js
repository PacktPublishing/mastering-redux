import produce from 'immer';
import { handle } from 'redux-pack';
import reducerRegistry from 'src/reducerRegistry';
import API from 'src/api.service';
import { getInfoDetails, getInfoEntityDataItem } from 'src/selectors';
import { setDetailsLoading } from 'src/details/details';
import cache from 'src/cache.service';

const reducerName = 'member';

export const GET_MEMBER_DATA = `mastering-redux/${reducerName}/GET_MEMBER_DATA`;
export const CREATE_MEMBER_AND_DETAILS = `mastering-redux/${reducerName}/CREATE_MEMBER_AND_DETAILS`;
export const UPDATE_MEMBER_NAME = `mastering-redux/${reducerName}/UPDATE_MEMBER_NAME`;

const defaultMember = { name: 'New Member' };
const defaultDetails = { bio: '', age: '' };
export const initialState = {
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBER_DATA: {
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          })
      });
    }
    case CREATE_MEMBER_AND_DETAILS: {
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          })
      });
    }
    case UPDATE_MEMBER_NAME: {
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          })
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// packs

export const getMemberData = (onSuccess, onError) => ({
  type: GET_MEMBER_DATA,
  promise: API('members'),
  meta: {
    onSuccess,
    onError
  }
});

export const createMemberAndDetails = ({ teamId }) => {
  const member = { ...defaultMember, teamId };
  const promise = API.post('members', member).then(memberResponse => {
    const entry = { ...defaultDetails, _memberId: memberResponse.id };
    return API.post('details', entry).then(entryResponse => {
      const newMember = { ...member, id: memberResponse.id };
      const newEntry = { ...entry, id: entryResponse.id };
      return { member: newMember, entry: newEntry };
    });
  });

  return {
    type: CREATE_MEMBER_AND_DETAILS,
    promise
  };
};

export const updateMemberName = (name, memberId) => ({
  type: UPDATE_MEMBER_NAME,
  promise: API.patch(`members/${memberId}`, { name })
});

// data-fetching thunks

export const getMemberDataThunk = dispatch =>
  new Promise((resolve, reject) => dispatch(getMemberData(resolve, reject)));

export const getMemberAndDetailsThunk = async (dispatch, getState) => {
  const state = getState();
  const { location } = state;
  const { level, id } = location.payload;
  let entityItem = cache.get(`${level}s`, id);
  if (level === 'member') {
    if (!entityItem) {
      await API(`${level}s/${id}`);
    }
    const entry = getInfoDetails(location.payload);
    if (entry === null) {
      dispatch(setDetailsLoading(true));
      await API('details');
      dispatch(setDetailsLoading(false));
    }
  }
};
