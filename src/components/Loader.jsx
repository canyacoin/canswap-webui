

import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

function Loader(props){
  return(
      <div style={{ paddingTop: props.padding}}>
        <CircularProgress />
      </div>
    );
}

export default Loader;