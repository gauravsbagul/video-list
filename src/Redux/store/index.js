import { combineReducers } from 'redux';
import videoList from './reducers/videoList';
import auth from './reducers/auth';
import colorStrip from './reducers/colorStrip';

export const AllReducers = combineReducers({
  videos: videoList,
  authentication: auth,
  colors: colorStrip,
});

const rootReducer = (state, action) => {
  return AllReducers(state, action);
};
export default rootReducer;
