import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Loader } from 'elements';
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

  componentDidMount() {
    const { connection, refreshBalance } = this.props;
    
    refreshBalance(connection.selectedAccount);
  }

  componentDidUpdate(prevProps) {
    const { connection, refreshBalance } = this.props;
    const { connection: prevConnection } = prevProps;

    if(prevConnection.selectedAccount !== connection.selectedAccount){
      refreshBalance(connection.selectedAccount);
    }
  }

  render() {
    const { classes, balance, hideToken, toggleTokenAction  } = this.props;

    // TODO - If loading, display overlay

    if (!balance.isLoaded) {
      return (
        <Loader padding={50}></Loader>
      );
    }

    if (balance.syncedBalances) {
      return (
        <BalanceList 
          tokens={balance.syncedBalances}
          classes={classes}
          onHideToken={(address) => {hideToken(address)}}
          onTokenClick={(i) => {toggleTokenAction(i)}}
        />
      )
    }

    if (balance.error) {
      return (
        <div>ErrOr ReTriEving Balance</div>
      )
    }

    return '';
  }
}

export default withStyles(styles)(Balances)