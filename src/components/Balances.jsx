import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BigNumber } from 'bignumber.js';

const styles = theme => ({
  root: {
    width: '100%'
  }
});

class Balances extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      lastAddress: context.web3.selectedAccount || "",
      lastSynced: null,
      error: null,
      // isLoaded: false,
    } 
  }

  componentDidMount() {
    this.loadBalances(this.state.lastAddress)
  }

  componentDidUpdate(prevProps) {
    const web3Context = this.context.web3;

    if(this.state.lastAddress !== web3Context.selectedAccount){
      this.loadBalances(web3Context.selectedAccount);
    }
  }

  loadBalances(address){
    let addressInfo = null;
    fetch("http://api.ethplorer.io/getAddressInfo/" +
    "0xcdb9896121bcb6b7385e8ae0575ec5ef466dbdf1?apiKey=freekey")
      .then(res => res.json())
      .then(
        (result) => {
          addressInfo = result;
          addressInfo.tokens = addressInfo.tokens.filter((token) => {
            if(token.tokenInfo && token.tokenInfo.price) {
              const usdVal = new BigNumber(token.balance.toString()).multipliedBy(new BigNumber(token.tokenInfo.price.rate)).dividedBy(new BigNumber((10**token.tokenInfo.decimals).toString(16), 16));
              return token.tokenInfo && token.tokenInfo.price && (usdVal).gt(new BigNumber("0.5"));
            }
            return false;            
          });
          this.setState({
            lastAddress: address,
            lastSynced: addressInfo,
            error: null
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            lastAddress: address,
            lastSynced: null,
            // isLoaded: true,
            error
          });
        }
      )
  }

  displayBalances = () => {
    let list = []
    const tokens = this.state.lastSynced.tokens;

    for (let i = 0; i < tokens.length; i++) {
      list.push(<ListItem button>
        <ListItemIcon>
          {tokens[i].tokenInfo.name}
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>);
    }

    return list
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          {
            this.state.lastSynced &&
            this.displayBalances()
          }
        </List>
        <Divider />
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </div>
    );
  }
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired
};

Balances.contextTypes = {
  web3: PropTypes.object
};

export default withStyles(styles)(Balances);
