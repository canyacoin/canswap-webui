import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import { changeTab, changeBackButton } from '../state/actions'

import BalancesContainer from 'components/balances/BalancesContainer'
import SwapContainer from 'components/swap/SwapContainer'
import Pools from 'components/pools/Pools'
import styles from './HomeStyles'

const routes = [
  { label: 'Swap', path: '/swap', render: (props) => <SwapContainer {...props} />  },
  { label: 'Pools', path: '/pools', render: (props) => <Pools {...props} /> },
  { label: 'Arbitrage', path: '/arbitrage', render: (props) => <div></div> }
]

class Home extends Component {

  render() {
    const { classes, layout: { mainTabIndex, subTabIndex, showBackButton }, changeTab, changeBackButton } = this.props
    console.log(this.props.layout)
    return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <div className={classes.SubContainer}>
                <AppBar position="static" className={classes.tabBar}>
                  <Tabs
                    value={subTabIndex}
                    onChange={(event, i) => changeTab(i, false)}
                    indicatorColor="primary"
                    textColor="primary">
                    <Tab label="Assets" />
                    <Tab label="Stakes" />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={'x'}
                  index={subTabIndex}
                  onChangeIndex={(i) => changeTab(i, false)}
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
                    !showBackButton && 
                    <Tabs value={mainTabIndex} 
                          onChange={(_, value) => changeTab(value)}
                          indicatorColor="primary"
                          textColor="primary">
                      {
                        routes.map(({label, path, hidden}) => 
                            <Tab key={label} 
                            label={label} 
                            component={Link} 
                            to={path} />
                        )
                      }
                    </Tabs>
                  }
                  {
                    showBackButton && 
                    <Toolbar className={classes.toolbar} >
                      <Button color="primary"
                              onClick={() => changeBackButton()}
                              component={Link} 
                              to={'/pools'}>
                        <KeyboardArrowLeft />
                        Back
                      </Button>
                      <div className={classes.grow}></div>         
                    </Toolbar>
                  }
                </AppBar> 
                <Route path='/' exact={true} render={() => <Redirect to="/swap"/>}/>
                {
                  routes.map(({label, path, render}, index) => 
                            <Route 
                              path={path} 
                              key={`route${label}`} 
                              render={(props) => render({
                                    showHideBackButton: () => this.showHideBackButton(), 
                                    index, 
                                    ...props })
                                } /> 
                            )
                }
              </div>
            </Grid>
          </Grid>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  layout: state.layout
})

const mapDispatchToProps = (dispatch) => ({
  changeTab: (index, mainTab) => { dispatch(changeTab(index, mainTab)) },
  changeBackButton: () => { dispatch(changeBackButton(false)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Home))
