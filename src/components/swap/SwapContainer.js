import { connect } from 'react-redux'
import Swap from './Swap'

import { changeTab } from '../../state/actions'

const mapStateToProps = (state, ownProps) => ({
  connection: state.connection,
  showHideBackButton: ownProps.showHideBackButton
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeTab: () => { 
    console.log("Swap:updating");
  dispatch(changeTab(ownProps.index)) }
})


export default connect(mapStateToProps, mapDispatchToProps)(Swap)