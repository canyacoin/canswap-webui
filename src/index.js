import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import store from 'state/store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';


ReactDOM.render(
  <div className="App">
    <Provider store={store}>
      <Router>
        <Route path="/:url?" component={App}></Route>
      </Router>
    </Provider>
  </div>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
