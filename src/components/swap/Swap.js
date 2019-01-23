import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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

  async getOwner(){
    const { CanSwap } = this.props;
    const owner = await CanSwap.methods.owner().call();
    console.log(owner)
    this.setState({
      owner
    })
  }

  render() {
    const { classes, connection } = this.props;

    console.log(`+++ SwapContracts: ${JSON.stringify(connection)}`)

    return (
      <div className={classes.root}>
        <Button onClick={() => this.props.onClick()} color="primary">
          Click {this.state.owner}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Swap);
