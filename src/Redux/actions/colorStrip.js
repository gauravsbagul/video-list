import axios from 'axios';

import { ACTION_TYPE } from './constants';

const API =
  'https://5f16ad48a346a0001673929b.mockapi.io/api/mockdata/chemicals';

export const getColors = () => {
  return async (dispatch) => {
    try {
      const body = {
        method: 'GET',
        url: API,
      };

      const response = await axios(body);
      console.log('getColors -> response', response);

      dispatch({
        type: ACTION_TYPE.GET_COLORS,
        payload: { response: response.data, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.GET_COLORS,
        payload: { response: error.response, error: true },
      });
    }
  };
};

export const setColors = (cstripIndex, colorBoxIndex, colorValue) => {
  return async (dispatch) => {
    try {
      const body = {
        method: 'GET',
        url: API,
      };

      const response = await axios(body);
      console.log('setColors -> response', response);

      dispatch({
        type: ACTION_TYPE.SET_COLORS,
        payload: { response: response.data, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.SET_COLORS,
        payload: { response: error.response, error: true },
      });
    }
  };
};
