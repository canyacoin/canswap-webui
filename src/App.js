import React from 'react';
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from 'layout/Home';
import { Route } from 'react-router-dom'
import Header from 'layout/Header';
import ConnectionCheck from 'layout/ConnectionCheck';
import { initWeb3 } from './state/actions';
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

const App = ({dispatch}) => {

  dispatch(initWeb3())
  
  return (
    <ConnectionCheck>
      <MuiThemeProvider theme={theme}>
        <Header />
			  <Route path='/' render={(props) => <Home {...props} />}/>
      </MuiThemeProvider>
    </ConnectionCheck>
  );
}

export default connect()(App);
