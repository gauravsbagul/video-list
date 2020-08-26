import axios from 'axios';

import { ACTION_TYPE } from './constants';
import AsyncStorage from '@react-native-community/async-storage';

export const login = (data) => {
  return async (dispatch) => {
    try {
      await AsyncStorage.setItem('loginDetails', JSON.stringify(data));

      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: { response: 'Login Success', error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: { response: 'Login Failed', error: true },
      });
    }
  };
};

export const isLoggedIn = () => {
  return async (dispatch) => {
    try {
      const response = await AsyncStorage.getItem('loginDetails');

      dispatch({
        type: ACTION_TYPE.IS_LOGIN,
        payload: response
          ? { response: 'Logged in', error: false }
          : { response: 'Logged Out', error: true },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.IS_LOGIN,
        payload: { response: 'Logged Out', error: true },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const response = await AsyncStorage.removeItem('loginDetails');

      dispatch({
        type: ACTION_TYPE.LOGOUT,
        payload: { response: 'Error White logging out', error: true },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.LOGOUT,
        payload: { response: 'Error White logging out', error: true },
      });
    }
  };
};
