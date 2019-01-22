import store from '../state/store'
import { updateConnection, updateWeb3, addContract } from '../state/actions'
import Web3 from 'web3'
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import CanSwap from '../assets/contracts/CanSwap.json'

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

let interval = null;
let networkInterval = null;
let web3js = null;
let connection = {};

async function getWeb3() {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      var { ethereum, web3 } = window;
      
      if (ethereum) {
        console.log('++ web3\twindow.ethereum detected');
        resolve(new Web3(ethereum));
      } else if (web3) {
        console.log('++ web3\twindow.web3 detected');
        resolve(new Web3(web3.currentProvider));
      } else {
        console.log('++ web3\tfallback web3');
        resolve(null)
      }
    })
  })
}

function initPoll() {
  if (!interval) {
    interval = setInterval(fetchAccounts, ONE_SECOND);
  }
}

function initContracts() {
  const canSwap = new web3js.eth.Contract(CanSwap.abi, process.env.REACT_APP_CANSWAP_ADDRESS);
  store.dispatch(addContract(canSwap))
}

function initNetworkPoll() {
  if (!networkInterval) {
    networkInterval = setInterval(fetchNetwork, ONE_MINUTE);
  }
}

function fetchAccounts() {
  const ethAccounts = getAccounts();

  if (isEmpty(ethAccounts)) {
    web3js && web3js.currentProvider && web3js.currentProvider.enable()
    .then(accounts => handleAccounts(accounts))
    .catch((err) => {
      dispatchConnection({
        accountsError: err
      });
    });
  } else {
    handleAccounts(ethAccounts);
  }
}

function handleAccounts(accounts, isConstructor = false) {
  let next = accounts[0];
  let curr = connection.selectedAccount;
  next = next && next.toLowerCase();
  curr = curr && curr.toLowerCase();
  const didChange = curr && next && (curr !== next);

  if ((isEmpty(connection.accounts) && !isEmpty(accounts)) || 
      (didChange && !isConstructor)) {
      dispatchConnection({
        accountsError: null,
        accounts,
        selectedAccount: next
      });
  }
}

function fetchNetwork() {
  if (web3js) {
    const isV1 = /^1/.test(web3js.version);
    const getNetwork = isV1 ? web3js.eth.net.getId : web3js.version.getNetwork;

    getNetwork((err, netId) => {
      if (err) {
        dispatchConnection({
          networkError: err
        });
      } else {
        const network = () =>{
          switch (netId) {
            case '1':
              return 'MAINNET';
            case '2':
              return 'MORDEN';
            case '3':
              return 'ROPSTEN';
            case '4':
              return 'RINKEBY';
            case '42':
              return 'KOVAN';
            default:
              return 'UNKNOWN';
          }
        };
        if (network() !== connection.network) {
          dispatchConnection({
            networkError: null,
            network: network()
          })
        }
      }
    });
  }
}

function getAccounts() {
  try {
    const isV1 = /^1/.test(web3js.version);
    // throws if no account selected
    const getV1Wallets = () => range(web3js.eth.accounts.wallet.length).map(i => web3js.eth.accounts.wallet[i]).map(w => w.address);
    const accounts = isV1 ? getV1Wallets() : web3js.eth.accounts;

    return accounts;
  } catch (e) {
    return [];
  }
}

function dispatchConnection(newState){
  store.dispatch(updateConnection({
    ...connection,
    ...newState
  }))
}

function handleChange() {
  function select(state){
    return state.connection
  }
  
  var newConnection = select(store.getState())

  if (connection !== newConnection) {
    console.log(
      'Some deep nested property changed'
    )
    connection = newConnection;
  }  
}

async function manageWeb3() {
  web3js = await getWeb3();
  store.dispatch(updateWeb3(web3js));

  const unsubscribe = store.subscribe(() => handleChange())
  window.addEventListener('beforeunload', () => unsubscribe());

  if(web3js) {
    const accounts = getAccounts();
  
    fetchAccounts();
    fetchNetwork();
    initContracts();
    initPoll();
    initNetworkPoll();
  
    if (accounts) {
      handleAccounts(accounts, true);
    }
  }
}


export default manageWeb3
