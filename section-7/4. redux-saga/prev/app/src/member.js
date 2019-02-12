import produce from 'immer';
import { handle } from 'redux-pack';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';


const reducerName = 'member';

export const GET_MEMBER_DATA = `mastering-redux/${reducerName}/GET_MEMBER_DATA`;
export const CREATE_MEMBER_AND_DETAILS = `mastering-redux/${reducerName}/CREATE_MEMBER_AND_DETAILS`;
export const UPDATE_MEMBER_NAME = `mastering-redux/${reducerName}/UPDATE_MEMBER_NAME`;

const defaultMember = { name: 'New Member' };
const defaultDetails = { bio: '', age: '' };
export const initialState = {
  data: {},
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBER_DATA: {
      return handle(state, action, {
        start: s => produce(s, draft => { draft.loading = true; }),
        finish: s => produce(s, draft => { draft.loading = false; }),
        success: s => produce(s, draft => {
          draft.data = {};
          action.payload.forEach(item => { draft.data[item.id] = item; });
        })
      });
    }
    case CREATE_MEMBER_AND_DETAILS: {
      return handle(state, action, {
        start: s => produce(s, draft => { draft.loading = true; }),
        finish: s => produce(s, draft => { draft.loading = false; }),
        success: s => produce(s, draft => {
          const { member } = action.payload;
          draft.data[member.id] = { ...defaultMember, ...member };
        })
      });
    }
    case UPDATE_MEMBER_NAME: {
      return handle(state, action, {
        start: s => produce(s, draft => { draft.loading = true; }),
        finish: s => produce(s, draft => { draft.loading = false; }),
        success: s => produce(s, draft => {
          const { name, id } = action.payload;
          draft.data[id].name = name;
        })
      });

    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// packs

export const getMemberData = () => ({
  type: GET_MEMBER_DATA,
  promise: API('members')
});

export const createMemberAndDetails = ({ teamId }) => {
  const member = { ...defaultMember, teamId };
  const promise = API.post('members', member)
    .then(memberResponse => {
      const entry = { ...defaultDetails, _memberId: memberResponse.id };
      return API.post('details', entry)
        .then(entryResponse => {
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
