import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BigNumber } from 'bignumber.js';
import Loader from '../../elements/Loader';
import BalanceList from './BalanceList';

const styles = theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flexGrow: 1
  },
});


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

//TODO - THUNK
// componentDidUpdate(prevProps) {
//   if (prevProps.forPerson !== this.props.forPerson) {
//     this.props.dispatch(
//       makeASandwichWithSecretSauce(this.props.forPerson)
//     );
//   }
// }

export default withStyles(styles)(Balances)