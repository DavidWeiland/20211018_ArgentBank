import produce from 'immer'

const initialState = {
  status: 'void',
  auth: null,
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


export const userFetching = () => ({ type: FETCHING })
export const userResolved = (data) => ({ type: RESOLVED, payload: data })
export const userAuthorized = (data) => ({ type: AUTHORIZED, payload: data })
export const userRejected = (error) => ({ type: REJECTED, payload: error })



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
        }
        return
      }
      
      default:
        return
    }
  })
}