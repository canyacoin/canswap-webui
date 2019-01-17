import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from './layout/Home.jsx';
import Header from './layout/Header.jsx';
import ConnectionCheck from './layout/ConnectionCheck';
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
  render() {
    return (
      <ConnectionCheck>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Home />
        </MuiThemeProvider>
      </ConnectionCheck>
    );
  }
}

export default App;
