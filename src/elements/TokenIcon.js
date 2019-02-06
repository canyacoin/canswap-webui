import React from 'react';

export default ({symbol}) => {

  const srcPrefix = `${process.env.PUBLIC_URL}/icons/`;

  function getIcon() {
    return `${srcPrefix}${symbol.toLowerCase()}.svg`
  }

  function getDefaultIcon() {
    return `${srcPrefix}default.svg`
  }

  return (
    <img src={`${getIcon()}`} onError={(e)=>{e.target.onerror = null; e.target.src=`${getDefaultIcon()}`}} alt="" width="24" height="24" />
  )
}
