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

  render() {
    const { classes, contracts, connection } = this.props;

    console.log(`+++ SwapContracts: ${contracts}`)

    return (
      <div className={classes.root}>
        <Button onClick={() => this.props.onClick()} color="primary">
          Click
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Swap);
