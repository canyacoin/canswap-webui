import { BigNumber } from 'bignumber.js';

/*
 * action types
 */

export const UPDATE_CONNECTION = 'UPDATE_CONNECTION'

export const FETCH_BALANCE = 'FETCH_BALANCE'
export const SET_BALANCE = 'SET_BALANCE'
export const SET_BALANCE_ERROR = 'SET_BALANCE_ERROR'
export const HIDE_TOKEN = 'HIDE_TOKEN'
export const TOGGLE_TOKEN = 'TOGGLE_TOKEN'

export const UPDATE_WEB3 = 'UPDATE_WEB3'
export const ADD_CONTRACT = 'ADD_CONTRACT'

/*
 * other constants
 */

/*
 * action creators
 */

export function updateConnection(value) {
  return { type: UPDATE_CONNECTION, value}
}

export function fetchBalance(address) {  
  return (dispatch) => {

    dispatch({ type: FETCH_BALANCE, address })

    let getUsdValue = (token) => {
      if(token.tokenInfo && token.tokenInfo.price) {
        const usdVal = new BigNumber(token.balance.toString()).multipliedBy(new BigNumber(token.tokenInfo.price.rate)).dividedBy(new BigNumber((10**token.tokenInfo.decimals).toString(16), 16));
        console.log(`${token.tokenInfo.symbol} ------- ${usdVal}`)
        return parseFloat(usdVal.toPrecision(5)) + ' USD';
      }
      return '';
    }
  
    let getBalanceString = (amount, decimals) => {
      const usdVal = new BigNumber(amount.toString()).dividedBy(new BigNumber((10**decimals).toString(16), 16))
      return parseFloat(usdVal.toPrecision(10))
    }

    return fetch(`http://api.ethplorer.io/getAddressInfo/` +
    `${address}?apiKey=${process.env.REACT_APP_ETHPLORER_KEY}`, {
      method: "GET" })
      .then(res => res.json())
      .then(
        (result) => {
          try {
            result.tokens.forEach(tkn => {
              tkn.usdVal = getUsdValue(tkn);
              tkn.hidden = false;
              tkn.showActions = false;
              tkn.balance = getBalanceString(tkn.balance, tkn.tokenInfo.decimals);
              tkn.symbol = tkn.tokenInfo.symbol;
              tkn.name = tkn.tokenInfo.name;
              tkn.address = tkn.tokenInfo.address;
            })
            result.tokens.unshift({
              usdVal: '',
              hidden: false,
              showActions: false,
              balance: result.ETH.balance,
              symbol: 'ETH',
              name: 'Ethereum',
              address: '0x0',
            })
            dispatch(setBalance(address, result.tokens))
          } catch(e) {
            dispatch(setBalanceError(address, e))
          }          
        },
        (error) => {
          dispatch(setBalanceError(address, error))
        }
      )
  }
}

export function setBalance(address, value) {
  return { type: SET_BALANCE, address, value}
}

export function setBalanceError(address, error) {
  return { type: SET_BALANCE_ERROR, address, error}
}

export function hideToken(tokenAddress) {
  return { type: HIDE_TOKEN, tokenAddress }
}

export function toggleTokenAction(index) {
  return { type: TOGGLE_TOKEN, index }
}

// export function hideToken(tokenAddress) {
//   return (dispatch, getState) => {
//     const { tokens } = getState().otherReducer;

//     dispatch(anotherAction(items));
//   }
// }

export function updateWeb3(value) {
  return { type: UPDATE_WEB3, value}
}

export function addContract(name, value) {
  return { type: ADD_CONTRACT, name, value}
}