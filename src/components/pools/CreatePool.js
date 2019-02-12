import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { changeBackButton } from '../../state/actions'

const styles = () => ({

})


class CreatePool extends Component {

  componentDidMount(){
    this.props.changeBackButton()
  }

  render(){
    return <div>xx</div>
  } 
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch) => ({
  changeBackButton: () => { dispatch(changeBackButton()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreatePool))