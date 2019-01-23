import {
  UPDATE_CONNECTION,
  FETCH_BALANCE,
  SET_BALANCE,
  SET_BALANCE_ERROR,
  HIDE_TOKEN,
  TOGGLE_TOKEN,
  UPDATE_WEB3,
  ADD_CONTRACT,
} from './actions'
import { persistentReducer } from 'redux-pouchdb-plus';
import { combineReducers } from 'redux'


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

function balance(state = {
  syncedAddress: "",
  syncedBalances: [],
  error: null,
  isLoaded: false,
}, action){
  const isRefresh = state.syncedAddress === action.address;
  let tokens = state.syncedBalances.slice();
  switch(action.type){
    case FETCH_BALANCE:
      return {
        syncedAddress: "",
        syncedBalances: [],
        error: null,
        isLoaded: !isRefresh
      }
    case SET_BALANCE:
      return {
        syncedAddress: action.address,
        syncedBalances: action.value,
        error: null,
        isLoaded: true,
      }  
    case SET_BALANCE_ERROR:
      return {
        syncedAddress: isRefresh ? state.syncedAddress : '',
        syncedBalances: isRefresh ? state.syncedBalances : [],
        isLoaded: true,
        error: action.error
      }
    case HIDE_TOKEN:
      let i = tokens.findIndex((tkn) => { return tkn.address === action.tokenAddress })
      if (i > -1){
        tokens[i].hidden = !tokens[i].hidden;
      }
      return {
        ...state,
        syncedBalances: tokens
      }
    case TOGGLE_TOKEN:
      tokens[i].showActions = !tokens[i].showActions;
      return {
        ...state,
        syncedBalances: tokens
      }    
    default:
      return state;
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
  connection,
  balance,
  web3js,
  contracts
})

export { connection, balance, web3js, contracts, reducers }

export default reducers