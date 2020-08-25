import axios from 'axios';
import { ACTION_TYPE } from './constants';

const API = 'https://private-c31a5-task27.apiary-mock.com/videos';

//To get access code for industry partners
export const getVideos = () => {
  console.log('getVideos -> getVideos');

  return async (dispatch) => {
    try {
      const body = {
        method: 'GET',
        url: API,
      };

      const response = await axios(body);
      console.log('getVideos -> response', response);

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
