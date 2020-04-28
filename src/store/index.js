import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ContactReducer from './reducers/ContactReducer';
import UserReducer from './reducers/UserReducer';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  contact: ContactReducer,
  user: UserReducer,
});

const store = createStore(
  rootReducers,
  composeEnhacers(applyMiddleware(thunk))
);

export default store;
