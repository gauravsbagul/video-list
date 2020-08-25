/* eslint-disable no-unreachable */
import { ACTION_TYPE } from '../../actions/constants';

const initialState = {};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_TYPE.GET_VIDEOS:
      return {
        ...state,
        getAllVideos: action.payload,
      };
    default:
      return state;
  }
  return newState;
};
