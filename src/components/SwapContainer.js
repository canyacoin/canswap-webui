import { connect } from 'react-redux'
import { drizzleConnect } from 'drizzle-react'
import drizzle from 'drizzle'
import Swap from './Swap'

const mapStateToProps = (state, ownProps) => ({
  xxxx: 'xxx',
  onClick: ownProps.onClick,
  accounts: state.accounts,
  drizzleStatus: state.drizzleStatus,
  CanSwap: state.contracts.CanSwap,
})

const SwapContainer = drizzleConnect(Swap, mapStateToProps);

export default SwapContainer
