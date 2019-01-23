import { createStore, compose, applyMiddleware } from 'redux'
import { persistentStore } from 'redux-pouchdb-plus';
import thunkMiddleware from 'redux-thunk';
import PouchDB from 'pouchdb';
import reducers from './reducers'

const initialState = {}

const db = new PouchDB('canswap-core');

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware
  ),
  persistentStore({
    db, 
    onReady: (store) => {
      console.log(store.getState());
    }
  })
)(createStore);

const store = createStoreWithMiddleware(reducers, initialState);

export default store