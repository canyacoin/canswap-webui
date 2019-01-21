import { createStore, compose } from 'redux'
import { persistentStore } from 'redux-pouchdb-plus';
import PouchDB from 'pouchdb';
import { generateContractsInitialState } from 'drizzle'
import drizzleOptions from './drizzleOptions'
import reducers from './reducers'

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
}

const db = new PouchDB('canswap-core');

const createStoreWithMiddleware = compose(
  persistentStore({
    db, 
    onReady: () => {
      console.log(`++ Store`);
    }
  })
)(createStore);

const store = createStoreWithMiddleware(reducers, initialState);

export default store