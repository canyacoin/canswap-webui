import { connect } from 'react-redux'
import Swap from './Swap'

const mapStateToProps = (state, ownProps) => ({
  connection: state.connection,
  CanSwap: state.contracts['CanSwap'] || {},
  onClick: ownProps.onClick
})

export default connect(mapStateToProps)(Swap)