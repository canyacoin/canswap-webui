import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  INCREMENT_STACK,
  DECREMENT_STACK,
  UPDATE_CONNECTION,
  UPDATE_WEB3,
} from './actions'

function count(state = { val: 0 }, action){
  switch(action.type) {
    case INCREMENT_COUNT:
      return { val: state.val + 1 };
    case DECREMENT_COUNT:
      return { val: state.val - 1 };
    default:
      return state;
  }
};


function stackCounter(state = [{ x: 0 }, { x: 1 }, { x: 2 }], action){
  switch (action.type) {
    case INCREMENT_STACK:
      return state.concat({ x: state.length })
    case DECREMENT_STACK:
      return !state.length ? state : state.slice(0, state.length - 1)
    default:
      return state
  }
}

// function eth(state = {}, action) {
//   switch(action.type) {
//     case 'initialise':

//     case 'web3/RECEIVE_ACCOUNT':
//     console.log(JSON.stringify(action));
//       return {
//         ...state,
//         ethAddress: action.address
//       };

//     case 'web3/CHANGE_ACCOUNT':
//     console.log(JSON.stringify(action));
//       return {
//         ...state,
//         ethAddress: action.address
//       };
//     case 'web3/LOGOUT':
//       return {
//         ...state,
//         ethAddress: null
//       }
//       default:
//         return state
//   }
// }

function connection(state = {
  accounts: [],
  network: null,
  networkError: null,
  selectedAccount: ''
}, action){
  switch(action.type) {
    case UPDATE_CONNECTION:
      return {
        ...state, 
        ...action.value
      }
    default:
      return state
  }
}

function web3js(state = {}, action){
  switch(action.type) {
    case UPDATE_WEB3:
      return action.value
    default:
      return state
  }
}


export { connection, web3js, count, stackCounter}