/*
 * action types
 */

export const INCREMENT_COUNT = 'INCREMENT_COUNT'
export const DECREMENT_COUNT = 'DECREMENT_COUNT'
export const INCREMENT_STACK = 'INCREMENT_STACK'
export const DECREMENT_STACK = 'DECREMENT_STACK'

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