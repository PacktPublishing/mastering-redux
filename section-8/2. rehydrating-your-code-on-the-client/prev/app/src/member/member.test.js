import { select, call, put } from 'redux-saga/effects';
import { LIFECYCLE } from 'redux-pack';
import reducer, {
  initialState,
  CREATE_MEMBER_AND_DETAILS,
  UPDATE_MEMBER_NAME,
  GET_MEMBER_DATA,
  setMemberWithDetailsEntry
} from 'src/member/member';
import { makePackAction } from 'src/store-utils';
import { onNavigationToInfo } from 'src/member/member.saga';
import { getInfoDetails, getInfoEntityDataItem } from 'src/selectors';
import API from 'src/api.service';

const defaultState = {
  ...initialState,
  data: {
    1: { id: 1, name: 'Member 1', teamId: 1 }
  }
};

describe('Member reducer', () => {
  it(`Test ${GET_MEMBER_DATA} action`, () => {
    const array = [
      { id: 1, name: 'Member 1', teamId: 1 },
      { id: 2, name: 'Member 2', teamId: 2 }
    ];
    const action = makePackAction(LIFECYCLE.SUCCESS, {
      type: GET_MEMBER_DATA,
      payload: array
    });
    const newState = reducer(defaultState, action);
    expect(newState.data).toEqual({
      1: array[0],
      2: array[1]
    });
  });

  it(`Test ${CREATE_MEMBER_AND_DETAILS} action`, () => {
    const memberId = Object.keys(defaultState.data).length + 1;
    const newMember = { id: memberId, teamId: 1 };
    const action = makePackAction(LIFECYCLE.SUCCESS, {
      type: CREATE_MEMBER_AND_DETAILS,
      payload: { member: newMember }
    });
    const newState = reducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      data: {
        ...defaultState.data,
        [memberId]: { name: 'New Member', ...newMember }
      }
    });
  });

  it(`Test ${UPDATE_MEMBER_NAME} action`, () => {
    const name = `test_member`;
    const action = makePackAction(LIFECYCLE.SUCCESS, {
      type: UPDATE_MEMBER_NAME,
      payload: { id: 1, name }
    });
    const newState = reducer(defaultState, action);
    const updated = newState.data[1];
    expect(updated.name).toMatch(name);
  });
});

describe('onNavigationToInfo saga', () => {
  const action = {
    type: 'INFO_ROUTE',
    payload: { level: 'member', id: 1 }
  };
  const entity = {
    id: 1,
    name: 'Member 1'
  };
  const details = {
    bio: 'lorem ipsum',
    age: 21
  };
  const generator = onNavigationToInfo(action);

  it('Tests getInfoEntityDataItem selector', () => {
    expect(generator.next().value).toEqual(select(getInfoEntityDataItem));
  });

  it('Tests API call to entity data', () => {
    expect(generator.next(null).value).toEqual(call(API, `members/1`));
  });

  it('Tests getInfoDetails selector', () => {
    expect(generator.next(entity).value).toEqual(select(getInfoDetails));
  });

  it('Tests API call to details data', () => {
    expect(generator.next(null).value).toEqual(call(API, 'details'));
  });

  it('Tests dispatch of SET_MEMBER_WITH_DETAILS_ENTRY action', () => {
    expect(generator.next(details).value).toEqual(
      put(setMemberWithDetailsEntry({ entity, details }))
    );
  });
});
