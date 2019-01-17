/*
 * action types
 */

export const INCREMENT_COUNT = 'INCREMENT_COUNT'
export const DECREMENT_COUNT = 'DECREMENT_COUNT'
export const INCREMENT_STACK = 'INCREMENT_STACK'
export const DECREMENT_STACK = 'DECREMENT_STACK'
export const UPDATE_CONNECTION = 'UPDATE_CONNECTION'
export const UPDATE_WEB3 = 'UPDATE_WEB3'

/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addCount() {
    return { type: INCREMENT_COUNT }
}

export function lowerCount() {
  return { type: DECREMENT_COUNT }
}

export function addStack() {
  return { type: INCREMENT_STACK }
}

export function lowerStack() {
  return { type: DECREMENT_STACK }
}

export function updateConnection(value) {
  return { type: UPDATE_CONNECTION, value}
}

export function updateWeb3(value) {
  return { type: UPDATE_WEB3, value}
}


//TODO - action - initialiseWeb3