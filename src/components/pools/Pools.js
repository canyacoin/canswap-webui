import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { fetchPools, changeTab } from 'state/actions'

import CreatePool from './CreatePool'
import './Pools.scss';


const styles = theme => ({
  root: {
    width: '100%'
  },
  poolView: {
    background: "#fff",
    minHeight: 80,
    paddingTop: 20
  }
});

const Pool = ({pool, classes}) => {
  return <div>
        <Grid
      className={classes.poolView}
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={2}>
        address: {pool.token}
      </Grid>
      <Grid item xs={2}>
        uri: {pool.uri}
      </Grid>
      <Grid item xs={2}>
        api: {pool.api}
      </Grid>
      <Grid item xs={2}>
        active: {JSON.stringify(pool.active)}
      </Grid>
      <Grid item xs={2}>
        balTKN: {pool.balTKN}
      </Grid>
      <Grid item xs={2}>
        balCAN: {pool.balCAN}
      </Grid>
    </Grid>
  </div>
}

const PoolList = ({classes, match, pools}) => {
    return (
      <div>    
        <span>{pools.status}</span>
        {
          pools.list.map((pool, i) => <Pool key={`p-${i}`} pool={pool} classes={classes} />
        )}
        <br/>
        <Fab component={Link} to={`${match.url}/create`}
          color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </div>
    )
}



class Pools extends Component {

  componentDidMount(){
    this.props.fetchPools()
    this.props.changeTab()
  }

  render() {
    const { classes, match, pools } = this.props;
    
    return (
      <div className={classes.root}>
        <Route path={match.url} exact={true} render={(props) => 
          <PoolList classes={classes} pools={pools} {...props}/>
        } />
        <Route path={`${match.url}/create`} render={(props) => 
          <CreatePool {...props}/>
        } />
      </div> 
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  connection: state.connection,
  pools: state.pools,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPools: () => { dispatch(fetchPools()) },
  changeTab: () => { 
    console.log("Pools:updating");dispatch(changeTab(ownProps.index)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Pools))