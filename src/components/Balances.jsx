import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { BigNumber } from 'bignumber.js';

const styles = theme => ({
  root: {
    width: '100%'
  }
});

function BalanceList(props) {

  function getBalance(amount, decimals) {
    const usdVal = new BigNumber(amount.toString()).dividedBy(new BigNumber((10**decimals).toString(16), 16));
    return parseFloat(usdVal.toPrecision(10));
  }

  function renderList(){
    let list = [];
    let tokens = props.tokens;

    for (let i = 0; i < tokens.length; i++) {
      list.push(
      <ListItem button key={`balance-${i}`}>
        <ListItemIcon>
          <img src={`${process.env.PUBLIC_URL}/icons/${tokens[i].tokenInfo.symbol.toLowerCase()}.svg`} alt="" width="24" height="24" />
        </ListItemIcon>
        <ListItemText 
          primary={tokens[i].tokenInfo.symbol} 
          secondary={getBalance(tokens[i].balance, tokens[i].tokenInfo.decimals)} 
        />
        <ListItemSecondaryAction>
          <ListItemText 
            primary={''} 
            secondary={tokens[i].usdVal} 
          />            
        </ListItemSecondaryAction>
      </ListItem>);
    }

    return <List>{list}</List>

  }

  return (
    renderList()
  );
}


class Balances extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      lastAddress: context.web3.selectedAccount || "",
      lastSynced: null,
      error: null,
      isLoaded: false,
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

  getUsdValue(token) {
    if(token.tokenInfo && token.tokenInfo.price) {
      const usdVal = new BigNumber(token.balance.toString()).multipliedBy(new BigNumber(token.tokenInfo.price.rate)).dividedBy(new BigNumber((10**token.tokenInfo.decimals).toString(16), 16));
      console.log(`${token.tokenInfo.symbol} ------- ${usdVal}`)
      return parseFloat(usdVal.toPrecision(5)) + ' USD';
      // return token.tokenInfo && token.tokenInfo.price && (usdVal).gt(new BigNumber("0.5"));
    }
    return '';
  }

  loadBalances(address){
    let addressInfo = null;
    fetch("http://api.ethplorer.io/getAddressInfo/" +
    "0xcdb9896121bcb6b7385e8ae0575ec5ef466dbdf1?apiKey=freekey")
      .then(res => res.json())
      .then(
        (result) => {
          addressInfo = result;
          addressInfo.tokens.forEach(element => {
            element.usdVal = this.getUsdValue(element);
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          {
            this.state.lastSynced &&
            <BalanceList tokens={this.state.lastSynced.tokens}>
            </BalanceList>
          }
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
