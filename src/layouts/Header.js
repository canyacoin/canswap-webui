
import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import './Header.css';
import logo from '../assets/logo.svg'


const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

function Header(props) {
  const { classes } = props;

  return (
      <div>
        <AppBar position="static">
            <Toolbar>
                <img src={logo} className="icon" />
                
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  News
                </Typography>
            </Toolbar>
        </AppBar>
      </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);