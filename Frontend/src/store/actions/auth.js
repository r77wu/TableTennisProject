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

export const isAuth = () => {
  return dispatch => {
    axios.get('/api/v1/users/isAuth').then(response => {
      if(response.data.status === 'seccuss') {
        dispatch(authSuccess(response.data.user));
      }
    })
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
      const {__v, ...newUser} = response.data.data.user;
      dispatch(authSuccess(newUser));
    }).catch((error) => {
      console.log(error);
      dispatch(authFail('Please try again!'))
    }); 
  }
}

export const signup = (newUser) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('/api/v1/users/signup', newUser).then(response => {
      console.log(response);
      const {__v, ...newUser} = response.data.data.user;
      dispatch(authSuccess(newUser));
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

export const getMe = () => {
  return dispatch => {
    dispatch(authStart());
    axios.get('/api/v1/users/getMe').then(response => {
      console.log(response);
      const {__v, ...newUser} = response.data.data;
      dispatch(authSuccess(newUser));
    }).catch(error => {
      dispatch(authFail('Please try again!'))
    });
  }
}