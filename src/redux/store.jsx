import { createStore, compose } from 'redux'
import { persistentStore, persistentReducer } from 'redux-pouchdb-plus';
import { count, stackCounter, connection } from './reducers'
import { combineReducers } from 'redux'
import PouchDB from 'pouchdb';

const db = new PouchDB('canswap-core');

const reducers = combineReducers({
  count: persistentReducer(count),
  stackCounter: persistentReducer(stackCounter),
  connection
})

// db.allDocs({include_docs: true}).then((res) => {
//   res.rows.forEach((row) => { 
//     console.log(row.doc); 
//   });
// }).catch(console.log.bind(console));

let initialised = false;

const createStoreWithMiddleware = compose(
  persistentStore({
    db, 
    onReady: (store) => {
      console.log(`++ Store`);
      initialised = true;
    }
  })
)(createStore);

const store = createStoreWithMiddleware(reducers);

export { initialised, store }

export default store