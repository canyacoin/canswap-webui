import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  INCREMENT_STACK,
  DECREMENT_STACK,
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


export { count, stackCounter}