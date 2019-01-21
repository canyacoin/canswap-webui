import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
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

  function renderList(){
    let list = [];

    for (let i = 0; i < tokens.length; i++) {
      list.push(
        !tokens[i].hidden && 
        <ListItem button key={`balance-${i}`} onClick={() => onTokenClick(i)}>
          <ListItemIcon>
            <TokenIcon symbol={tokens[i].symbol}></TokenIcon>
          </ListItemIcon>
          <ListItemText 
            primary={tokens[i].symbol} 
            secondary={tokens[i].balance} 
          />
          <ListItemSecondaryAction>
            {
              tokens[i].showActions &&
              <IconButton aria-label="Hide">
                <VisibilityOffIcon onClick={() => {onHideToken(i)}}></VisibilityOffIcon>
              </IconButton>
            }
            {
              !tokens[i].showActions &&
              <ListItemText 
                primary={''} 
                secondary={tokens[i].usdVal} 
              />   
            }
          </ListItemSecondaryAction>
        </ListItem>
      );
    }

    return ( 
        <List>{list}</List>
    );
  }

  return (
    <div > 
      { renderList() }
    </div>
  );
}


class Balances extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      lastAddress: props.connection.selectedAccount || "",
      syncedAddress: "",
      syncedBalances: [],
      error: null,
      isLoaded: false,
    } 
  }

  componentDidMount() {
    this.loadBalances(this.state.lastAddress)
  }

  componentDidUpdate() {
    const { connection } = this.props;

    if(this.state.lastAddress !== connection.selectedAccount){
      this.loadBalances(connection.selectedAccount);
    }
  }

  getUsdValue(token) {
    if(token.tokenInfo && token.tokenInfo.price) {
      const usdVal = new BigNumber(token.balance.toString()).multipliedBy(new BigNumber(token.tokenInfo.price.rate)).dividedBy(new BigNumber((10**token.tokenInfo.decimals).toString(16), 16));
      console.log(`${token.tokenInfo.symbol} ------- ${usdVal}`)
      return parseFloat(usdVal.toPrecision(5)) + ' USD';
    }
    return '';
  }

  getBalanceString(amount, decimals) {
    const usdVal = new BigNumber(amount.toString()).dividedBy(new BigNumber((10**decimals).toString(16), 16))
    return parseFloat(usdVal.toPrecision(10))
  }

  hideToken(index) {
    const tokens = this.state.syncedBalances.slice();
    tokens[index].hidden = !tokens[index].hidden;
    this.setState({
      syncedBalances: tokens
    });
  }

  showHideAction(index) {
    const tokens = this.state.syncedBalances.slice();
    tokens[index].showActions = !tokens[index].showActions;
    this.setState({
      syncedBalances: tokens
    });
  }

  loadBalances(address){
    let setError = (e) => {
      this.setState({
        lastAddress: address,
        syncedAddress: '',
        syncedBalances: [],
        isLoaded: true,
        error: e
      });
    }

    fetch(`http://api.ethplorer.io/getAddressInfo/` +
    `${address}?apiKey=${process.env.REACT_APP_ETHPLORER_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          try {
            result.tokens.forEach(tkn => {
              tkn.usdVal = this.getUsdValue(tkn);
              tkn.hidden = false;
              tkn.showActions = false;
              tkn.balance = this.getBalanceString(tkn.balance, tkn.tokenInfo.decimals);
              tkn.symbol = tkn.tokenInfo.symbol;
              tkn.name = tkn.tokenInfo.name;
              tkn.address = tkn.tokenInfo.address;
            })
            result.tokens.unshift({
              usdVal: '',
              hidden: false,
              showActions: false,
              balance: result.ETH.balance,
              symbol: 'ETH',
              name: 'Ethereum',
              address: '0x0',
            })
            this.setState({
              lastAddress: address,
              syncedAddress: address,
              syncedBalances: result.tokens,
              error: null,
              isLoaded: true
            })
          } catch(e) {
            setError(e)
          }          
        },
        (error) => {
          setError(error)
        }
      )
  }

  render() {
    const { classes } = this.props;

    if (!this.state.isLoaded) {
      return (
        <Loader padding={50}></Loader>
      );
    }

    if (this.state.syncedBalances) {
      return (
        <BalanceList 
          tokens={this.state.syncedBalances}
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

    return '';
  }
}

//TODO - VisibleBalanceList = connect(mapStateToProps, mapDispatchtoProps)(BalanceList)

const mapStateToProps = (state) => ({
  connection: state.connection
  
})

export default connect(
  mapStateToProps
)(withStyles(styles)(Balances));

