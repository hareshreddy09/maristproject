import axios from 'axios';
import { API_BASE_URL } from './Constants'

export const login = (email, password) => {
  return (dispatch) => {
    return axios.post(`${API_BASE_URL}/login`, { email, password })
      .then((response) => {
        const token = response.data.token;
        dispatch(setToken(token));
        dispatch(setUsername(email));
        window.location.hash = '/dashboard';
      })
      .catch((error) => {
        alert('failed login');
      });
  };
};

export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    payload: token,
  };
};

export const setUsername = (username) => {
    return {
      type: 'SET_USERNAME',
      payload: username,
    };
  };
  
