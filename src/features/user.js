import { createSlice} from '@reduxjs/toolkit'

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

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetching: (draft) => {
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
    },
    resolved: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating' || draft.status === 'authorized') {
        draft.data = action.payload
        draft.status = 'resolved'
      }
      return
    },
    authorized: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.auth = action.payload
        draft.status = 'authorized'
      }
      return
    },
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = null
        draft.status = 'rejected'
        localStorage.removeItem('localEmail')
        localStorage.removeItem('localPassword')
      }
      return
    },
    reset: () => {
      return initialState
    }
  }
})

export const { fetching, resolved, authorized, rejected, reset } = actions

export default reducer
