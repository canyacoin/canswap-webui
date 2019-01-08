import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 64,
      paddingRight: 64
    },
  },
  container: {
    flexGrow: 1,
    minHeight: 500,
    backgroundColor: '#fff',
    borderRadius: 5
  },
});

class Home extends Component {

  state = {
    tabIndex: 0,
  };

  handleChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  handleChangeIndex = index => {
    this.setState({ tabIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <div className={classes.container}>
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.tabIndex}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Assets" />
                  <Tab label="Stakes" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={'x'}
                index={this.state.tabIndex}
                onChangeIndex={this.handleChangeIndex}
              >
                <div>Item One</div>
                <div>Item Two</div>
              </SwipeableViews>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={classes.container}>
              xx
            </div>
          </Grid>
        </Grid>
      </div>
      )
    }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);
