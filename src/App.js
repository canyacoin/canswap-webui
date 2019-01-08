import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from './components/Home.jsx';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33ccff',
      light: '#f0fbff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#f8f8f8',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    }
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Header />
          <Home />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
