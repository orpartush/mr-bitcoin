import { StorageService } from '../../services/StorageService';

const initialState = {
  currUser: StorageService.load('user'),
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURR_USER':
      return { currUser: action.user };
    case 'GET_CURR_USER':
      return state;
    case 'ADD_MOVE':
      return { currUser: action.updatedUser };
    case 'SIGNOUT':
      return { currUser: action.user };
    default:
      return state;
  }
}

export default UserReducer;
