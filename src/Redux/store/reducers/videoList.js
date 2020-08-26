/* eslint-disable no-unreachable */
import { ACTION_TYPE } from '../../actions/constants';

const initialState = {};

export default (state = initialState, action) => {
  console.log('state', state);
  const newState = { ...state };
  switch (action.type) {
    case ACTION_TYPE.GET_VIDEOS:
      return {
        ...state,
        getAllVideos: action.payload,
      };
      break;
    default:
      return state;
  }
  return newState;
};
