import {
  POUCHDB_INIT,
  TAB_CHANGE,
  BACK_CHANGE,
  UPDATE_CONNECTION,
  FETCH_BALANCE,
  SET_BALANCE,
  SET_BALANCE_ERROR,
  HIDE_TOKEN,
  TOGGLE_TOKEN,
  UPDATE_WEB3,
  UPDATE_POOLS
} from './actions'
import { persistentReducer } from 'redux-pouchdb-plus';
import { combineReducers } from 'redux'


export const PoolsStatus = {
	INITIALIZED : 'initialized',
	FETCHING : 'fetching',
	SUCCESS : 'success',
	EMPTY : 'empty',
	ERROR : 'error'
};

const app = (state = {
  initialised: false
}, action = {}) => {
  switch (action.type){
    case POUCHDB_INIT:
      return {
        initialised: true
      }
    default: 
      return state
  }
  
}

const layout = (state = {
  subTabIndex: 0,
  mainTabIndex: 0,
  showBackButton: false
}, action = {}) => {
  switch (action.type) {
    case TAB_CHANGE:
    console.log("WHaaaat");
      return {
        ...state,
        ...(action.mainTab ? { mainTabIndex: action.index } : { subTabIndex: action.index })
      }
    case BACK_CHANGE:
    console.log("WHaaa33333at");
      return {
        ...state,
        showBackButton: action.show
      }
    default:

    console.log("WHaa4444444aat++ " + action.type);
      return state
  }
}

const connection = (state = {
  accounts: [],
  network: null,
  networkError: null,
  selectedAccount: ''
}, action) => {
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

const balance = (state = {
  syncedAddress: "",
  syncedBalances: [],
  error: null,
  isLoaded: false,
}, action) => {
  const isRefresh = state.syncedAddress === action.address;
  let tokens = state.syncedBalances.slice();
  switch(action.type){
    case FETCH_BALANCE:
      return {
        ...state,
        error: null,
        isLoaded: isRefresh
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
      if (i > -1) {
        tokens[i].hidden = !tokens[i].hidden;
      }
      return {
        ...state,
        syncedBalances: tokens
      }
    case TOGGLE_TOKEN:
      tokens[action.index].showActions = !tokens[action.index].showActions;
      return {
        ...state,
        syncedBalances: tokens
      }    
    default:
      return state;
  }
}

const web3js = (state = {

}, action) => {
  switch(action.type) {
    case UPDATE_WEB3:
      return action.value
    default:
      return state
  }
}

const pools = (state = {
  status: PoolsStatus.INITIALIZED,
  list: []
}, action) => {
  switch(action.type) {
    case UPDATE_POOLS:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  app,
  layout,
  connection,
  balance,
  web3js,
  pools: persistentReducer(pools, {name: 'pools-reducer'})
})

export { app, layout, connection, balance, web3js, pools }

export default reducers