import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  token: null,
  username: null,
  work: null,
  home: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WORK':
    return {
        ...state,
        work: action.payload,
    };
    case 'SET_HOME':
    return {
        ...state,
        home: action.payload,
    };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_USERNAME':
    return {
        ...state,
        username: action.payload,
    };
    default:
      return state;
  }
};

const state = createStore(reducer, applyMiddleware(thunk));

export default state
