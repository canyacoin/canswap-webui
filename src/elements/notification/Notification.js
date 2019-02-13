import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { notificationRemove } from 'state/actions'


export const NotificationType = {
	SUCCESS : 'success',
	WARNING : 'warning',
	ERROR : 'error',
	INFO : 'info',
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbarContent = ({ classes, className, message, onClose, variant, ...other }) => {
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const Snackbars = ({dispatch, notifications}) => {

  const onClose = (event, reason, id) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(notificationRemove(id))
  }

  return (
    <div>		  
      {notifications.map( (notification, i) => <Snackbar
        key={i}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!notification.closed}
        autoHideDuration={notification.duration}
        onClose={(event, reason) => onClose(event, reason, notification.id)}
      >        
        <MySnackbarContentWrapper
            onClose={(event, reason) => onClose(event, reason, notification.id)}
            {...notification}
          />
      
      </Snackbar> )}
    </div>
  )
}

const mapStateToProps = (state) => ({
	notifications: state.app.notifications
})


export default connect(mapStateToProps)(Snackbars);