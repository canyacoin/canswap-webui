import React from 'react';

function TokenIcon(props) {

  const srcPrefix = `${process.env.PUBLIC_URL}/icons/`;

  function getIcon(symbol) {
    return `${srcPrefix}${symbol.toLowerCase()}.svg`
  }

  function getDefaultIcon() {
    return `${srcPrefix}default.svg`
  }

  return (
    <img src={`${getIcon(props.symbol)}`} onError={(e)=>{e.target.onerror = null; e.target.src=`${getDefaultIcon()}`}} alt="" width="24" height="24" />
  )
}

export default TokenIcon;