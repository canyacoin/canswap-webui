import React from 'react';
import { connect } from 'react-redux'
import { notificationRemove } from 'state/actions'
import CloseIcon from '@material-ui/icons/Close';
import './Notification.scss'

// notification types
export const NotificationType = {
	WARNING : 'warning',
	NOTIFICATION : 'notification',
	SUCCESS : 'success'
}

class NotificationItem extends React.Component{
	
	state = { open: false }
	transitionSpeed = 200;
	style = { transition : 'all ' + this.transitionSpeed + 'ms ease-in-out' }
	timeout = window.setTimeout(()=>{},0)

	componentDidMount(){
		setTimeout(e => this.setState({open : true}), 10)

		if(this.props.duration){
			this.timeout = window.setTimeout(()=>{
				this.close()
			}, this.props.duration)
		}
	}

	render(){
		return 	<div className={'item'} data-type={this.props.type} data-open={this.state.open} style={this.style}>
              <span dangerouslySetInnerHTML={{__html : this.props.text}}/>
              <CloseIcon onClick={ e => this.close(this.props.id)}/>
            </div>
	}

	close(){
		clearTimeout(this.timeout);
		
		this.setState({open : false}, ()=>{
			setTimeout(e => this.props.handleClose(this.props.id), this.transitionSpeed)
		})
	}
}

const Notification = ({notifications, dispatch}) => {
	return 	<div className="element notification">
				{notifications.map( (notification, i) => <NotificationItem key={i} {...notification} handleClose={ id => dispatch(notificationRemove(id)) }/> )}
			</div>
}

const mapStateToProps = (state) => ({
	notifications: state.app.notifications
})

export default connect(mapStateToProps)(Notification)