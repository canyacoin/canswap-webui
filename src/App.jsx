import React, { Component } from 'react';
import { Web3Provider } from 'react-web3';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './layout/Header.jsx';
import Home from './layout/Home.jsx';
import './App.css';
import store from './redux/store';
import { addCount, addStack } from './redux/actions';
import { inSync } from 'redux-pouchdb-plus';

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

  constructor(){
    super()
    // Log the initial state
    console.log(store.getState())
    console.log(inSync())

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    const unsubscribe = store.subscribe(() => console.log(store.getState()))

    
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
      <div className="App">
        <Web3Provider passive={true}>
          <MuiThemeProvider theme={theme}>
            <Header />
            <Home />
          </MuiThemeProvider>
        </Web3Provider>
        <button onClick={() => {this.dispatchEv()}}>click</button>
      </div>
    );
  }
}

export default App;
