import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './state/store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import getWeb3 from './util/manageWeb3';
import './index.css';

getWeb3();

ReactDOM.render(
  <div className="App">
    <Provider store={store}>
      <App />
    </Provider>
  </div>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
