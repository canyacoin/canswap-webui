import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Notification } from 'elements'

import { ConnectionCheck, Header, Home } from 'layout';
import { initWeb3 } from './state/actions';

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
			  <Notification/>
			  <Route path='/' render={(props) => <Home {...props} />}/>
      </MuiThemeProvider>
    </ConnectionCheck>
  );
}

export default connect()(App);
