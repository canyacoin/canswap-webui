import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import metamask from '../assets/metamask.svg';
import Loader from '../components/Loader';


const styles = () => ({
  root: {
    padding: 64
  },
  spinnerContainer: {
    paddingTop: 156
  },
  image: {
    maxWidth: 160,
  },
  subTitle: {
    maxWidth: 400,
    margin: 'auto'
  }
});

function ConnectionError(props) {

  return (
    <div className={props.classes.root}>
      <img src={metamask} alt="metamask" className={props.classes.image} />
      <h3>{props.title}</h3>
      <p className={props.classes.subTitle}>{props.message}</p>
    </div>
  );
}

ConnectionError.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};



class ConnectionCheck extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      initialised: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
        this.setState({initialised: true})
    }, 1000)
  }

  render() {
    const { classes, connection, web3js } = this.props;
    console.log(`++ re render ${JSON.stringify(connection)}`)
    if(!web3js || !connection.selectedAccount){
      if(!this.state.initialised){
        return (
          <Loader padding={156}></Loader>
        );
      }
      if(!web3js){
        return (
          <ConnectionError title="Web3 Not Found" message="It seems that you are using a browser without Web3 capabilities. Please
          make sure that you are using a web3-capable browser like mist or parity.
          If you are using MetaMask or Parity extension, make sure that it is
          enabled." classes={classes} />
        )
      }
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
        { connection.selectedAccount}  
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  connection: state.connection
})

export default connect(
  mapStateToProps
)(withStyles(styles)(ConnectionCheck));



