import { BigNumber } from 'bignumber.js';
import { Web3Service } from '../eth'
import { getDecimals, getTokenBalance, getTokenSymbol, getTokenDecimals, getEthBalance, getTokenContract, getCanSwapContract } from '../eth'
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import { PoolsStatus } from './reducers'

export const UPDATE_CONNECTION = 'UPDATE_CONNECTION'

export const UPDATE_WEB3 = 'UPDATE_WEB3'

export const FETCH_BALANCE = 'FETCH_BALANCE'
export const SET_BALANCE = 'SET_BALANCE'
export const SET_BALANCE_ERROR = 'SET_BALANCE_ERROR'
export const HIDE_TOKEN = 'HIDE_TOKEN'
export const TOGGLE_TOKEN = 'TOGGLE_TOKEN'

export const UPDATE_POOLS = 'UPDATE_POOLS'


export function updateConnection(value) {
  return { type: UPDATE_CONNECTION, value}
}

export function updateWeb3(value) {
  return { type: UPDATE_WEB3, value}
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

export function updatePools(data) {
  return { type: UPDATE_POOLS, data }
}


export function fetchPools() {
  return async (dispatch, getState) => {
    dispatch(updatePools({
      status: PoolsStatus.FETCHING
    }))

    const canswapContract = await getCanSwapContract()

    canswapContract.methods.poolCount().call().then( async (poolCount) => {
      if(poolCount <= 0){
        return dispatch(updatePools({
          status: PoolsStatus.EMPTY
        }))
      }
      let pools = []
      try {
        for(var i = 0; i < poolCount; i++){
          let bal = await canswapContract.methods.getPoolBalanceById(i).call()
          console.log(bal)
          let meta = await canswapContract.methods.getPoolMetaById(i).call()
          console.log(meta)
          pools.push({...bal, ...meta})
        }

        return dispatch(updatePools({
          status: PoolsStatus.SUCCESS,
          list: pools
        }))

      } catch (e) {
        console.log(JSON.stringify(e))
        return dispatch(updatePools({
          status: PoolsStatus.ERROR
        }))
      }

    }).catch(e => {
      console.log(JSON.stringify(e))
      dispatch(updatePools({
        status: PoolsStatus.ERROR
      }))
    })
  }
} 


export function pollNetwork() {
  return async (dispatch, getState) => {

    let connection = getState().connection;
  
    Web3Service.getNetwork().then(network => {
      if (network !== connection.network) {
        dispatch(updateConnection({
          networkError: null,
          network
        }))
      }
    }).catch(err => {
      dispatch(updateConnection({
        networkError: err
      }));
    })
  } 
}

export function pollAccounts() {
  return async (dispatch, getState) => {

    let web3js = await Web3Service.getWeb3();
    let connection = getState().connection;
    let ethAccounts = [];

    const handleAccounts = (accounts) => {
      let next = accounts[0];
      let curr = connection.selectedAccount;
      next = next && next.toLowerCase();
      curr = curr && curr.toLowerCase();
      const didChange = curr && next && (curr !== next);
    
      if ((isEmpty(connection.accounts) && !isEmpty(accounts)) || didChange) {
        dispatch(updateConnection({
          accountsError: null,
          accounts,
          selectedAccount: next
        }));
      }
    }

    try {
      const isV1 = /^1/.test(web3js.version);
      // throws if no account selected
      const getV1Wallets = () => range(web3js.eth.accounts.wallet.length).map(i => web3js.eth.accounts.wallet[i]).map(w => w.address);
      ethAccounts = isV1 ? getV1Wallets() : web3js.eth.accounts;
    } catch (e) {
    }

    if (isEmpty(ethAccounts)) {
      web3js && web3js.currentProvider && web3js.currentProvider.enable()
      .then(accounts => handleAccounts(accounts))
      .catch((err) => {
        dispatch(updateConnection({
          accountsError: err
        }));
      });
    } else {
      handleAccounts(ethAccounts);
    }
  } 
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

export function initWeb3() {
  return (dispatch) => {
    let acc, net
    window.addEventListener('load', () => {
      dispatch(pollNetwork());
      dispatch(pollAccounts());

      acc = setInterval(() => {
				dispatch(pollAccounts())
      }, 1000);
      net = setInterval(() => {
				dispatch(pollNetwork())
			}, 60000);
    });
    window.addEventListener("beforeunload", (e) => {
      clearInterval(acc)
      clearInterval(net)
    }, false);
  }
}
