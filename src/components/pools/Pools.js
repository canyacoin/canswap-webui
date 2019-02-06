import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { fetchPools } from '../../state/actions'
import Grid from '@material-ui/core/Grid';
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

class Pools extends Component {

  constructor(props){
    super(props);
  }
  
  componentWillMount(){
    this.props.fetchPools()
  }

  render() {
    const { classes, pools, connection } = this.props;

    return (
      <div className={classes.root}>
        <span>{pools.status}</span>
        {
          pools.list.map((pool, i) => <Pool key={`p-${i}`} pool={pool} classes={classes} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  connection: state.connection,
  pools: state.pools,
  showHideBackButton: ownProps.showHideBackButton
})

const mapDispatchToProps = (dispatch) => ({
  fetchPools: () => { dispatch(fetchPools()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Pools))