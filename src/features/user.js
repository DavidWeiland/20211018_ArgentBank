import produce from 'immer'

/**
 * @param { Object } store INIT with status 'void'
 */
const initialState = {
  status: 'void',
  auth: {
    token: null,
  },
  data: {
    id: null,
    lastName: null,
    firstName: null,
    email: null,
    password: null,
  },
  error: null
}

const FETCHING = 'user/fetching'
const RESOLVED = 'user/resolved'
const AUTHORIZED = 'user/authorized'
const REJECTED = 'user/rejected'
const RESET = 'user/reset'

/**
 * User action
 * @function userFetching action fetching
 * @param { String } type
 */
export const userFetching = () => ({ type: FETCHING })

/**
 * User action
 * @function userResolved action resolved
 * @param { String } type
 * @param { Object } data from axios.response
 */
export const userResolved = (data) => ({ type: RESOLVED, payload: data })

/**
 * User action
 * @function userAuthorized action authorized
 * @param { String } type
 * @param { Object } data from axios.response
 */
export const userAuthorized = (data) => ({ type: AUTHORIZED, payload: data })

/**
 * User action
 * @function userRejected action rejected
 * @param { String } type
 * @param { Object } error from axios.response
 */
export const userRejected = (error) => ({ type: REJECTED, payload: error })

/**
 * User action
 * @function userReset action reset
 * @param { String } type
 */
export const userReset = () => ({ type: RESET })


/**
 * User reducer
 * @function userReducer
 * @param { Object } store INIT
 * @param { Object } action
 * @param { String } action.type
 * @param { Object } action.payload data or error
 * 
 * @returns { Object } store
 */
export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCHING: {
        if (draft.status === 'void') {
          draft.status = 'pending'
          return
        }
        if (draft.status === 'rejected') {
          draft.error = null
          draft.status = 'pending'
          return
        }
        if (draft.status === 'resolved' || draft.status === 'authorized') {
          draft.status = 'updating'
          return
        }
        return
      }
      case RESOLVED: {
        if (draft.status === 'pending' || draft.status === 'updating' || draft.status === 'authorized') {
          draft.data = action.payload
          draft.status = 'resolved'
        }
        return
      }
      case AUTHORIZED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.auth = action.payload
          draft.status = 'authorized'
        }
        return
      }
      case REJECTED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.error = action.payload
          draft.data = null
          draft.status = 'rejected'
          localStorage.removeItem('localEmail')
          localStorage.removeItem('localPassword')
        }
        return
      }
      case RESET: {
        return initialState
      }
      default:
        return
    }
  })
}