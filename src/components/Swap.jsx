import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    width: '100%',
    minHeight: 500,
    backgroundColor: '#fff'
  }
});

class Balances extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button onClick={() => this.props.onClick()} color="primary">
          Click
        </Button>
      </div>
    );
  }
}


Balances.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Balances);
