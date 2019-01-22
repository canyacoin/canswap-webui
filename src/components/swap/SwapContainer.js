import { connect } from 'react-redux'
import Swap from './Swap'

const mapStateToProps = (state, ownProps) => ({
  connection: state.connection,
  contracts: state.contracts,
  onClick: ownProps.onClick
})

export default connect(mapStateToProps)(Swap)