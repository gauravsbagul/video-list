import { combineReducers } from 'redux';
import videoList from './reducers/videoList';

export const AllReducers = combineReducers({
  videos: videoList,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return AllReducers(state, action);
};
export default rootReducer;
