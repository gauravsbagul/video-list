import { combineReducers } from 'redux';
import videoList from './reducers/videoList';
import auth from './reducers/auth';
export const AllReducers = combineReducers({
  videos: videoList,
  authentication: auth,
});

const rootReducer = (state, action) => {
  return AllReducers(state, action);
};
export default rootReducer;
