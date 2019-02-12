import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { getCanSwapContract } from '../../eth'


const styles = theme => ({
  root: {
    width: '100%',
    minHeight: 500,
    backgroundColor: '#fff'
  }
});

class Swap extends Component {

  constructor(props){
    super(props);
    this.state = {
      owner: ''
    }
    this.getOwner();
  }

  componentDidMount(){
    this.props.changeTab()
  }


  async getOwner(){
    let CanSwap = await getCanSwapContract();
    const owner = await CanSwap.methods.owner().call();
    
    this.setState({
      owner
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button onClick={() => this.props.showHideBackButton()} color="primary">
          Click {this.state.owner}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Swap);
