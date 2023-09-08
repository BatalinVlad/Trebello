import {
  login as httpLogin,
  logout as httpLogout,
  signup as httpSinup,
  getLoggedInUser as httpGetLoggedInUser,
  getUsers as httpGetUsers
} from '../services/UserService'


export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await httpLogin(userCreds);
      dispatch(_setUser(user));
    } catch (err) {
      console.log('UserActions: err in login', err);
    }
  };
}

export function signup(userCreds) {
  return async dispatch => {
    try {
      const user = await httpSinup(userCreds);
      dispatch(_setUser(user));
    } catch (err) {
      console.log('UserActions: err in signup', err);
    }
  };
}

export function logout() {
  return async dispatch => {
    try {
      await httpLogout();
      dispatch(_setUser(null));
    } catch (err) {
      console.log('UserActions: err in logout', err);
    }
  };
}

export function getLoggedInUser() {
  return async dispatch => {
    try {
      const user = await httpGetLoggedInUser();
      if (Object.entries(user).length === 0) return;
      dispatch(_setUser(user));
    } catch (err) {
      console.log('UserActions: err in logout', err);
    }
  };
}

function _setUser(user) {
  return {
    type: 'SET_USER',
    user
  };
}

export function getUsers() {
  return async dispatch => {
    try {
      const users = await httpGetUsers();
      dispatch(_setUsers(users));
    } catch (err) {
      console.log('UserActions: err in getUsers', err);
    }
  }
}

function _setUsers(users) {
  return {
    type: 'SET_USERS',
    users
  };
}