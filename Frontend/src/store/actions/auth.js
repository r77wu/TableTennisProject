import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const submitForm = {
      email: email,
      password: password
    };
    
    
    axios.post('/api/v1/users/login', submitForm).then(response => {
      console.log(response);
      dispatch(authSuccess(response.data.data.user));
    }).catch((error) => {
      console.log(error);
      dispatch(authFail('Please try again!'))
    }); 
  }
}

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(authStart());
    axios.get('/api/v1/users/logout').then(response => {
      dispatch(logoutSuccess());
    }).catch(error => {
      dispatch(authFail('Please try again!'))
    });
  }
}

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}