import { StorageService } from './StorageService';
import moment from 'moment';

export const UserService = {
  getUser,
  addMove,
  signout,
};

var user = {
  name: '',
  coins: 100,
  moves: [],
};

function getUser(name) {
  let currUser = StorageService.load('user');
  if (currUser) {
    user = currUser;
    return Promise.resolve(user);
  }
  if (name) {
    user.name = name;
    StorageService.store('user', user);
    return Promise.resolve(user);
  }
  return;
}

function signout() {
  StorageService.store('user', null);
  user = {
    name: '',
    coins: 100,
    moves: [],
  };
}

function addMove(contact, amount) {
  const move = {
    toId: contact._id,
    to: contact.name,
    at: moment().format('MMMM Do YYYY, h:mm:ss a'),
    amount,
  };
  user.moves.unshift(move);
  user.coins -= amount;
  StorageService.store('user', user);
  return Promise.resolve(user);
}
