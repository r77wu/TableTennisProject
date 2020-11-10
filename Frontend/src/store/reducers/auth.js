import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utilities/utility';

const initalState = {
  user: {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    age: null,
    country: null,
    city: null,
    style: null,
    role: null
  },
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null, 
    loading: true
  });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    user: action.user
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const logout = (state, action) => {
  return updateObject(state, {
    user: {
      _id: null,
      name: null,
      email: null,
      age: null,
      country: null,
      style: null,
      role: null
    },
    error: null,
    loading: false,
    authRedirectPath: '/'
  })
}

const authSetRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  })
}


const reduer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return authSetRedirectPath(state, action);
    case actionTypes.AUTH_LOGOUT: return logout(state, action);
    default: return state
  }
}

export default reduer;