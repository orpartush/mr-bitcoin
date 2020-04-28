import { UserService } from '../../services/UserService';

export function getCurrUser() {
  return async dispatch => {
    try {
      const currUser = await UserService.getUser();
      dispatch({ type: 'GET_CURR_USER', currUser });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function signup(name) {
  return async dispatch => {
    try {
      const user = await UserService.getUser(name);
      dispatch({ type: 'SET_CURR_USER', user });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function signout() {
  return async dispatch => {
    try {
      const user = await UserService.signout();
      dispatch({ type: 'SIGNOUT', user });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function addMove(contact, amount) {
  return async dispatch => {
    try {
      const updatedUser = await UserService.addMove(contact, amount);
      dispatch({ type: 'ADD_MOVE', updatedUser });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
