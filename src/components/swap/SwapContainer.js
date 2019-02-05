import { connect } from 'react-redux'
import Swap from './Swap'

const mapStateToProps = (state, ownProps) => ({
  connection: state.connection,
  showHideBackButton: ownProps.showHideBackButton
})

export default connect(mapStateToProps)(Swap)