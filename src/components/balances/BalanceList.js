import React from 'react';

import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TokenIcon from 'elements/TokenIcon';

function BalanceList(props) {

  let { tokens, onHideToken, onTokenClick } = props;

  return (
    <List>
      {tokens.map((tkn, i) => {
        return (
          !tkn.hidden && 
          <ListItem button key={`balance-${i}`} onClick={() => onTokenClick(i)}>
            <ListItemIcon>
              <TokenIcon symbol={tkn.symbol}></TokenIcon>
            </ListItemIcon>
            <ListItemText 
              primary={tkn.symbol} 
              secondary={tkn.balance} 
            />
            <ListItemSecondaryAction>
              {
                tkn.showActions &&
                <IconButton aria-label="Hide">
                  <VisibilityOffIcon onClick={() => {onHideToken(tkn.address)}}></VisibilityOffIcon>
                </IconButton>
              }
              {
                !tkn.showActions &&
                <ListItemText 
                  primary={''} 
                  secondary={tkn.usdVal} 
                />   
              }
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  );
}

export default BalanceList;