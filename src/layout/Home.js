import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import BalancesContainer from '../components/balances/BalancesContainer';
import SwapContainer from '../components/swap/SwapContainer';

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
    minHeight: 48,
    borderBottom: '1px solid #f8f8f8'
  },
  grow: {
    flexGrow: 1
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
  toolbar: {
    minHeight: 48
  },
});

class Home extends Component {

  state = {
    subTabIndex: 0,
    mainTabIndex: 0,
    showBackButton: false
  };

  handleTabChange = (index, mainTab = true) => {
    mainTab ? this.setState({ mainTabIndex: index }) : this.setState({ subTabIndex: index })
  }

  showHideBackButton = () => {
    this.setState({ showBackButton: !this.state.showBackButton });
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
                    onChange={(event, value) => this.handleTabChange(value, false)}
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
                  onChangeIndex={(index) => this.handleTabChange(index, false)}
                  className={classes.tabContents}
                >
                  <BalancesContainer />
                  <div>Item Two</div>
                </SwipeableViews>
              </div>
            </Grid>
            <Grid item xs={9}>
              <div className={classes.mainContainer}>
                <AppBar position="static" className={classes.tabBar}>
                { 
                  !this.state.showBackButton && 
                  <Tabs
                    value={this.state.mainTabIndex}
                    onChange={(event, value) => this.handleTabChange(value)}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Swap" />
                    <Tab label="Pools" />
                    <Tab label="Arbitrage" />
                  </Tabs>
                }
                {
                  this.state.showBackButton && 
                  <Toolbar className={classes.toolbar} >
                    <Button color="primary" onClick={() => this.showHideBackButton()}> 
                      <KeyboardArrowLeft />
                      Back
                    </Button>
                    <div className={classes.grow}></div>         
                  </Toolbar>
                }
                </AppBar> 
                {
                  this.state.mainTabIndex === 0 && 
                  <SwapContainer onClick={() => this.showHideBackButton()} />
                }
                {
                  this.state.mainTabIndex === 1 && 
                  <div>
                  </div>
                }
                {
                  this.state.mainTabIndex === 2 && 
                  <div>
                  </div>
                }
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
