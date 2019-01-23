import { connect } from 'react-redux'
import Balances from './Balances'
import { fetchBalance, hideToken, toggleTokenAction } from '../../state/actions'


const mapStateToProps = (state) => ({
  connection: state.connection,
  balance: state.balance,
})

const mapDispatchToProps = (dispatch) => ({
  refreshBalance: (address) => {
    dispatch(fetchBalance(address))
  },
  hideToken: (tokenAddress) => {
    dispatch(hideToken(tokenAddress))
  },
  toggleTokenAction: (i) => {
    dispatch(toggleTokenAction(i))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balances);