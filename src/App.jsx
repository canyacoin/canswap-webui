import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from './redux/store';
import { addCount, addStack } from './redux/actions';
import { inSync } from 'redux-pouchdb-plus';
import Home from './layout/Home.jsx';
import Header from './layout/Header.jsx';
import ConnectionCheck from './layout/ConnectionCheck';
// import manageWeb3 from './util/manageWeb3';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33ccff',
      light: '#f0fbff',
    },
    secondary: {
      main: '#f8f8f8',
    }
  }
});


class App extends Component {

  constructor(props){
    super(props)
    // manageWeb3();

    // Log the initial state
    console.log(store.getState())
    console.log(inSync())

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    // store.subscribe(() => console.log(store.getState()))


    // store.dispatch(addTodo('Learn about reducers'))
    // store.dispatch(addTodo('Learn about store'))
    // store.dispatch(toggleTodo(0))
    // store.dispatch(toggleTodo(1))
    // store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

    // Stop listening to state updates
    // unsubscribe()
  }

  dispatchEv(){// Dispatch some actions
    store.dispatch(addCount())
    store.dispatch(addStack())
  }

  render() {
    return (
      <ConnectionCheck>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Home />
          <button onClick={() => {this.dispatchEv()}}>click</button>
        </MuiThemeProvider>
      </ConnectionCheck>
    );
  }
}

export default App;
