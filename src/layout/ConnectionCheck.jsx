import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import metamask from '../assets/metamask.svg';


const styles = () => ({
  root: {
    padding: 64
  },
  image: {
    maxWidth: 160,
  }
});

function ConnectionError(props) {

  return (
    <div className={props.classes.root}>
      <img src={metamask} alt="metamask" className={props.classes.image} />
      <h3>{props.title}</h3>
      <h4>{props.message}</h4>
    </div>
  );
}

ConnectionError.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

class ConnectionCheck extends React.Component {

  render() {
    
    //TODO - add a delay in here.. Show loading for 2s and then render

    const web3Context = this.context.web3;
    const { web3 } = window;
    const { classes } = this.props;

    if(!web3){
      return (
        <ConnectionError title="Web3 Not Found" message="It seems that you are using a browser without Web3 capabilities. Please
        make sure that you are using a web3-capable browser like mist or parity.
        If you are using MetaMask or Parity extension, make sure that it is
        enabled." classes={classes} />
      )
    }
    if(!web3Context.selectedAccount){
      return (        
        <ConnectionError title="No ETH Account Available" message="It seems that you don&apos;t have an ETH account selected. If using
        MetaMask, please make sure that your wallet is unlocked and that
        you have at least one account in your accounts list." classes={classes} />
      )
    }
    return (
      <div> 
        { this.props.children } 
        { process.env.REACT_APP_NETWORK_ID } 
        { web3Context.selectedAccount}  
      </div>
    )
  }
}


ConnectionCheck.contextTypes = {
  web3: PropTypes.object
};

export default withStyles(styles)(ConnectionCheck);



