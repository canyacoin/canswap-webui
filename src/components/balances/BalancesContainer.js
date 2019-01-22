import { connect } from 'react-redux'
import Balances from './Balances'


const mapStateToProps = (state) => ({
  connection: state.connection
})

export default connect(
  mapStateToProps
)(Balances);