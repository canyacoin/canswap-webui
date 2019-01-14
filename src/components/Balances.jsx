import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { BigNumber } from 'bignumber.js';
import Loader from './Loader';
import TokenIcon from './TokenIcon';

const styles = theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flexGrow: 1
  },
});

function BalanceList(props) {

  let { tokens, classes, onHideToken, onTokenClick } = props;
  
  function getBalanceString(amount, decimals) {
    const usdVal = new BigNumber(amount.toString()).dividedBy(new BigNumber((10**decimals).toString(16), 16))
    return parseFloat(usdVal.toPrecision(10))
  }

  function renderList(){
    let list = [];

    for (let i = 0; i < tokens.length; i++) {
      list.push(
      <ListItem button key={`balance-${i}`} onClick={() => onTokenClick(i)}>
        <ListItemIcon>
          <TokenIcon symbol={tokens[i].tokenInfo.symbol}></TokenIcon>
        </ListItemIcon>
        <ListItemText 
          primary={tokens[i].tokenInfo.symbol} 
          secondary={getBalanceString(tokens[i].balance, tokens[i].tokenInfo.decimals)} 
        />
        <ListItemSecondaryAction>
          {
            tokens[i].showActions &&
            <DeleteIcon onClick={() => {onHideToken(i)}}></DeleteIcon>
          }
          {
            !tokens[i].showActions &&
            <ListItemText 
              primary={''} 
              secondary={tokens[i].usdVal} 
            />   
          }
        </ListItemSecondaryAction>
      </ListItem>);
    }

    return ( 
        <List>{list}</List>
    );
  }

  return (
    <div className={classes.root}> 
      { renderList() }
    </div>
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

  hideToken(index) {
    const addressInfo = this.state.lastSynced;
    addressInfo.tokens[index].hidden = !addressInfo.tokens[index].hidden;
    this.setState({
      lastSynced: addressInfo
    });
  }

  showHideAction(index) {
    const addressInfo = this.state.lastSynced;
    addressInfo.tokens[index].showActions = !addressInfo.tokens[index].showActions;
    this.setState({
      lastSynced: addressInfo
    });
  }

  loadBalances(address){
    let addressInfo = null;
    fetch(`http://api.ethplorer.io/getAddressInfo/` +
    `${address}?apiKey=${process.env.REACT_APP_ETHPLORER_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          try {
            addressInfo = result;
            addressInfo.tokens.forEach(element => {
              element.usdVal = this.getUsdValue(element);
            });
            // ToDo: Parse the API call
            // Props: 'BalanceString' - 'USD Val' - 'Symbol/Name' - 'Address' - 'Hidden/showActions' - 
            this.setState({
              lastAddress: address,
              lastSynced: addressInfo,
              error: null,
              isLoaded: true
            })
          } catch(e) {
            this.setState({
              lastAddress: address,
              lastSynced: null,
              isLoaded: true,
              error: e
            });
          }          
        },
        (error) => {
          this.setState({
            lastAddress: address,
            lastSynced: null,
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { classes } = this.props;


    if (!this.state.isLoaded) {
      return <Loader padding={50}></Loader>
    }

    if (this.state.lastSynced) {
      const visibleTokens = this.state.lastSynced.tokens.filter((val) => {
        return !val.hidden;
      });
      return (
        <BalanceList 
          tokens={visibleTokens}
          classes={classes}
          onHideToken={(i) => {this.hideToken(i)}}
          onTokenClick={(i) => {this.showHideAction(i)}}
        />
      )
    }

    if (this.state.error) {
      return (
        <div>ErrOr ReTriEving Balance</div>
      )
    }
  }
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired
};

Balances.contextTypes = {
  web3: PropTypes.object
};

export default withStyles(styles)(Balances);
