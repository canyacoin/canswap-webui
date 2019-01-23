import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  INCREMENT_STACK,
  DECREMENT_STACK,
  UPDATE_CONNECTION,
  UPDATE_WEB3,
  ADD_CONTRACT,
} from './actions'
import { persistentReducer } from 'redux-pouchdb-plus';
import { combineReducers } from 'redux'

function count(state = { val: 0 }, action){
  switch(action.type) {
    case INCREMENT_COUNT:
      return { val: state.val + 1 };
    case DECREMENT_COUNT:
      return { val: state.val - 1 };
    default:
      return state;
  }
};

function stackCounter(state = [{ x: 0 }, { x: 1 }, { x: 2 }], action){
  switch (action.type) {
    case INCREMENT_STACK:
      return state.concat({ x: state.length })
    case DECREMENT_STACK:
      return !state.length ? state : state.slice(0, state.length - 1)
    default:
      return state
  }
}

function connection(state = {
  accounts: [],
  network: null,
  networkError: null,
  selectedAccount: ''
}, action){
  switch(action.type) {
    case UPDATE_CONNECTION:
      return {
        ...state, 
        ...action.value
      }
    default:
      return state
  }
}

function web3js(state = {}, action){
  switch(action.type) {
    case UPDATE_WEB3:
      return action.value
    default:
      return state
  }
}

function contracts(state = {}, action){
  switch(action.type) {
    case ADD_CONTRACT:
      return {
        ...state,
        [action.name]: action.value
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  count: persistentReducer(count),
  stackCounter: persistentReducer(stackCounter),
  connection,
  web3js,
  contracts
})

export { connection, web3js, count, contracts, stackCounter, reducers }

export default reducers