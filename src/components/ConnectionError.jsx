import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import metamask from '../assets/metamask.svg';


const styles = () => ({
  root: {
    padding: 64
  },
  image: {
    maxWidth: 160,
  }
});

function ConnectionError(props) {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <img src={metamask} alt="metamask" className={classes.image} />
      <h3>{props.title}</h3>
      <h4>{props.message}</h4>
    </div>
  );
}

ConnectionError.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(ConnectionError);
