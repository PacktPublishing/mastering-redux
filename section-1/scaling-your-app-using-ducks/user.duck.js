export const CREATE_USER = 'mastering-redux/user/CREATE_USER';
export const DELETE_USER = 'mastering-redux/user/DELETE_USER';

const initialState = {
  byId: {}
};

export default function reducer(state = initialState, action) {
  switch (action) {
    case CREATE_USER: {
      const { user } = action.payload;
      return {
        ...state,
        byId: { ...state.byId, [user.id]: user }
      };
    }
    case DELETE_USER: {
      const { id } = action.payload;
      const { [id]: deleted, ...byId } = state.byId;
      return { ...state, byId };
    }
    default:
      return state;
  }
}

export const addUser = (user) => ({ type: CREATE_USER, payload: user });
export const deleteUser = (user) => ({ type: DELETE_USER, payload: user });
