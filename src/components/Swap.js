import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    const { xxxx, accounts, drizzleStatus, CanSwap, onClick } = this.props;

    console.log(`++ drizzleStatus: ${JSON.stringify(drizzleStatus)}`)
    console.log(`++ xxxx: ${JSON.stringify(xxxx)}`)
    console.log(`++ accounts: ${JSON.stringify(accounts)}`)
    console.log(`++ onClick: ${JSON.stringify(onClick)}`)
    console.log(`++ CanSwap: ${JSON.stringify(CanSwap)}`)
    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    // if (drizzleStatus.initialized) {
    //   // Declare this call to be cached and synchronized. We'll receive the store key for recall.
    //   const dataKey = CanSwap.methods.owner.cacheCall()

    //   // Use the dataKey to display data from the store.
    //   return CanSwap.methods.storedData[dataKey].value
    // }

    // If Drizzle isn't initialized, display some loading indication.
    return 'Loading...'

    // return (
    //   <div className={classes.root}>
    //     <Button onClick={() => this.props.onClick()} color="primary">
    //       Click
    //     </Button>
    //   </div>
    // );
  }
}


// Swap.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

// export default withStyles(styles)(Swap);

export default Swap