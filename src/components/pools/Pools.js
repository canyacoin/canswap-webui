import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { fetchPools } from '../../state/actions'


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#fff'
  }
});

class Pools extends Component {

  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.props.fetchPools()
  }

  render() {
    const { classes, pools, connection } = this.props;

    return (
      <div className={classes.root}>
        <span>{pools.status}</span>
        {
          pools.list.map((pool, i) => <div key={`p-${i}`}>
            {JSON.stringify(pool)}
          </div>
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