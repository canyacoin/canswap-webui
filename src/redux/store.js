import { createStore, compose } from 'redux'
import { persistentStore, persistentReducer } from 'redux-pouchdb-plus';
import { count, stackCounter, connection, web3js } from './reducers'
import { combineReducers } from 'redux'
import PouchDB from 'pouchdb';

const db = new PouchDB('canswap-core');

const reducers = combineReducers({
  count: persistentReducer(count),
  stackCounter: persistentReducer(stackCounter),
  connection,
  web3js,
})

let initialised = false;

const createStoreWithMiddleware = compose(
  persistentStore({
    db, 
    onReady: () => {
      console.log(`++ Store`);
      initialised = true;
    }
  })
)(createStore);

const store = createStoreWithMiddleware(reducers);

export { initialised, store }

export default store