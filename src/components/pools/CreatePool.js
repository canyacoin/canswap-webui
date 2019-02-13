import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'

import { changeBackButton, createPool } from 'state/actions'

const styles = () => ({

})


class CreatePool extends Component {

  componentDidMount(){
    this.props.changeBackButton()
  }

  render(){
    return <div><Button onClick={() => {this.props.createPool()}}>click me</Button></div>
  } 
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch) => ({
  changeBackButton: () => { dispatch(changeBackButton()) },
  createPool: () => { dispatch(createPool()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreatePool))