import axios from 'axios'
import produce from 'immer'
import { baseUrl } from '../utils/data'

const initialState = {
  status: 'void',
  token : null,
  data: {
    _id: null,
    lastName: null,
    firstName: null,
    email: null,
    password: null
  },
  error:null
}

const FETCHING = 'user/fetching'
const RESOLVED = 'user/resolved'
const AUTHORIZED = 'user/authorized'
const REJECTED = 'user/rejected'
const RESET = 'user/reset'

const userFetching = () => ({ type: FETCHING })
const userResolved = (data) => ({ type: RESOLVED, payload: data })
const userAuthorized = (data) => ({ type: AUTHORIZED, payload: data })
const userRejected = (error) => ({ type: REJECTED, payload: error })
const userReset = () => ({ type: RESET })


export async function createUser(store, body) {
  const status = store.getState().user.status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(userFetching())
  try {
    const res = await axios.post(`${baseUrl}/user/signup`, body)
    const data = await res.data.body
    store.dispatch(userResolved(data))
  }
  catch (error) {
    store.dispatch(userRejected(error))
  }
}

export async function authorizeUser(store, body) {
  const status = store.getState().auth.status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(userFetching())
  try {
    const res = await axios.post(`${baseUrl}/user/login`, body)
    const data = await res.data.body
    store.dispatch(userAuthorized(data))
  }
  catch (error) {
    store.dispatch(userRejected(error))
  }
}

export async function resetUser(store) {
    store.dispatch(userReset())
}

export async function getOrModifyUser(store, body, headers) {
    const status = store.getState().user.status
    if (status === 'pending' || status === 'updating') {
      return 
    }
    store.dispatch(userFetching())
    try {
      const res = await axios.post(`${baseUrl}/user/profile`, body, headers)
      const data = await res.data.body
      store.dispatch(userResolved(data))
    }
    catch (error) {
      store.dispatch(userRejected(error))
    }
}

export async function UpdateUser(store, body, headers) {
  const status = store.getState().user.status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(userFetching())
  try {
    const response = await axios.put(`${baseUrl}/user/profile`, body, headers)
    const data = await response.data.body
    store.dispatch(userResolved(data))
  }
  catch (error) {
    store.dispatch(userRejected(error))
  }
}

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
          draft.token = action.payload
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
      case RESET: {
        return
      }
      default:
        return
    }
  })
}