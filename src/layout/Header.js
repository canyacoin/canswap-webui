
import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Lens from '@material-ui/icons/Lens';

import { withStyles } from '@material-ui/core/styles';
import logo from 'assets/logo.svg'


const styles = theme => ({
  root: {
    boxShadow: 'none',
  },
  toolbar: {
    backgroundColor: '#fff',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 8,
    paddingBottom: 8,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 96,
      paddingRight: 96,
      paddingTop: 16,
      paddingBottom: 16,
    },
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    maxHeight: 128,
    height: 32,
    [theme.breakpoints.up('md')]: {
      height: 48,
    }
  },
  icon: {
    fontSize: 16,
    color: 'green'
  }
});

const Header = ({classes}) => {
  return (
      <AppBar position="static" className={classes.root}>
          <Toolbar className={classes.toolbar} >
              <img src={logo} className={classes.logo} alt="canswap logo" />
              <div className={classes.grow}></div>                 
              <Lens className={classes.icon} />
          </Toolbar>
      </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);