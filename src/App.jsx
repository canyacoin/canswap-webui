import React, { Component } from 'react';
import { Web3Provider } from 'react-web3';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './layout/Header.jsx';
import Home from './layout/Home.jsx';
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
      <div className="App">
        <Web3Provider passive={true}>
          <MuiThemeProvider theme={theme}>
            <Header />
            <Home />
          </MuiThemeProvider>
        </Web3Provider>
      </div>
    );
  }
}

export default App;
