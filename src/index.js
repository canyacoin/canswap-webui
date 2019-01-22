import React from 'react';
import { Provider } from 'react-redux';
import { DrizzleProvider } from 'drizzle-react'
import ReactDOM from 'react-dom';
import store from './state/store';
import drizzleOptions from './state/drizzleOptions';
import * as serviceWorker from './serviceWorker';
import App from './App';
import getWeb3 from './util/getWeb3';
import './index.css';

// getWeb3();

ReactDOM.render(
  <div className="App">
    {/* <Provider store={store}> */}
      <DrizzleProvider options={drizzleOptions} store={store}>
      <App />
    </DrizzleProvider>
  </div>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
