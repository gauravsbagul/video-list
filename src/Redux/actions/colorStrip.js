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

export const setColors = (colorStripIndex, colorBoxIndex, colorValue) => {
  return async (dispatch, getState) => {
    try {
      const { getAllColors } = getState().colors;

      getAllColors.response[colorStripIndex].inputBoxValue = colorValue.value;
      getAllColors.response[
        colorStripIndex
      ].selectedColorBoxIndex = colorBoxIndex;

      const response = await getAllColors;

      dispatch({
        type: ACTION_TYPE.SET_COLORS,
        payload: { response: response.response, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.SET_COLORS,
        payload: { response: 'Something went wrong!', error: true },
      });
    }
  };
};

export const changeValue = (newValue, colorStripIndex, prevValue) => {
  return async (dispatch, getState) => {
    try {
      const { getAllColors } = getState().colors;

      let prevArray = getAllColors.response;
      prevArray[colorStripIndex].inputBoxValue = newValue;

      let currentValueItem = prevArray[colorStripIndex]?.values.filter(
        (item) => item.value == prevValue,
      );

      let currentValueItemIndex = prevArray[colorStripIndex].values.findIndex(
        (x) => x.value == currentValueItem[0].value,
      );

      prevArray[colorStripIndex].selectedColorBoxIndex = currentValueItemIndex;
      prevArray[colorStripIndex].values[currentValueItemIndex].value = newValue;
      const response = await prevArray;

      dispatch({
        type: ACTION_TYPE.SET_COLORS,
        payload: { response, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.SET_COLORS,
        payload: { response: 'Something went wrong!', error: true },
      });
    }
  };
};
