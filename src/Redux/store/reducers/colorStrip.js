/* eslint-disable no-unreachable */
import { ACTION_TYPE } from '../../actions/constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_COLORS:
      return {
        ...state,
        getAllColors: action.payload,
      };
    case ACTION_TYPE.SET_COLORS:
      return {
        ...state,
        getAllColors: action.payload,
      };
    default:
      return state;
  }
};
