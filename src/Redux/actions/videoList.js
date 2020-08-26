import axios from 'axios';
import { ACTION_TYPE } from './constants';

const API = 'https://private-c31a5-task27.apiary-mock.com/videos';

export const getVideos = () => {
  return async (dispatch, getState) => {
    try {
      const { getAllVideos } = getState().videos;
      const body = {
        method: 'GET',
        url: API,
      };

      const response = await axios(body);

      dispatch({
        type: ACTION_TYPE.GET_VIDEOS,
        payload: { response: response.data, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.GET_VIDEOS,
        payload: { response: error.response, error: true },
      });
    }
  };
};
