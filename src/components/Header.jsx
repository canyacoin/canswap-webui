
import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Lens from '@material-ui/icons/Lens';

import { withStyles } from '@material-ui/core/styles';
import logo from '../assets/logo.svg'


const styles = theme => ({
  root: {
    backgroundColor: '#fff',
    paddingLeft: 32,
    paddingRight: 32,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 64,
      paddingRight: 64
    },
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    maxHeight: 64
  },
  icon: {
    fontSize: 16,
    color: 'green'
  }
});

function Header(props) {
  const { classes } = props;

  return (
      <AppBar position="static">
          <Toolbar className={classes.root} >
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