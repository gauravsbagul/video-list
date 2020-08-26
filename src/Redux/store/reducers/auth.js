/* eslint-disable no-unreachable */
import { ACTION_TYPE } from '../../actions/constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        login: action.payload,
        userLoggedOut: false,
      };
    case ACTION_TYPE.IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
        userLoggedOut: action.payload.error,
      };
    case ACTION_TYPE.LOGOUT:
      return {
        state: undefined,
        userLoggedOut: true,
      };
    default:
      return state;
  }
};
