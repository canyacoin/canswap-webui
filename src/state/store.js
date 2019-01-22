import { createStore, compose, applyMiddleware } from 'redux'
import { persistentStore } from 'redux-pouchdb-plus';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import PouchDB from 'pouchdb';
import { generateContractsInitialState } from 'drizzle'
import drizzleOptions from './drizzleOptions'
import rootSaga from './rootSaga'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
}

const db = new PouchDB('canswap-core');


const sagaMiddleware = createSagaMiddleware()

// const createStoreWithMiddleware = compose(
//   applyMiddlewares,
//   persistentStore({
//     db, 
//     onReady: () => {
//       console.log(`++ Store`);
//     }
//   })
// )(createStore);

// const store = createStoreWithMiddleware(reducers, initialState);

// const store = persistentStore({
//   db, 
//   onReady: () => { console.log(`++ Store`); }
// })(
//   createStore(
//     reducers,
//     initialState,
//     composeEnhancers(
//       applyMiddleware(
//         thunkMiddleware,
//         sagaMiddleware
//       )
//     )
// ))

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)

export default store