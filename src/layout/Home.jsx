import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Balances from '../components/Balances';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 96,
      paddingRight: 96,
      paddingTop: 48,
    },
  },
  tabBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #f8f8f8'
  },
  subContainer: {
    flexGrow: 1,
    borderRadius: 5
  },
  tabContents: {
    minHeight: 500,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flexGrow: 1,
  },
});

class Home extends Component {

  state = {
    subTabIndex: 0,
    mainTabIndex: 0,
  };

  handleSubChange = (event, value) => {
    this.setState({ subTabIndex: value });
  };

  handleSubChangeIndex = index => {
    this.setState({ subTabIndex: index });
  };

  handleMainChange = (event, value) => {
    this.setState({ mainTabIndex: value });
  };

  handleMainChangeIndex = index => {
    this.setState({ mainTabIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <div className={classes.SubContainer}>
              <AppBar position="static" className={classes.tabBar}>
                <Tabs
                  value={this.state.subTabIndex}
                  onChange={this.handleSubChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Assets" />
                  <Tab label="Stakes" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={'x'}
                index={this.state.subTabIndex}
                onChangeIndex={this.handleSubChangeIndex}
                className={classes.tabContents}
              >
                <Balances></Balances>
                <div>Item Two</div>
              </SwipeableViews>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={classes.mainContainer}>
              <AppBar position="static" className={classes.tabBar}>
                <Tabs
                  value={this.state.mainTabIndex}
                  onChange={this.handleMainChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Swap" />
                  <Tab label="Pools" />
                  <Tab label="Arbitrage" />
                </Tabs>
              </AppBar>
              {this.state.mainTabIndex === 0 && <div>Item One</div>}
              {this.state.mainTabIndex === 1 && <div>Item Two</div>}
              {this.state.mainTabIndex === 2 && <div>Item Three</div>}
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
