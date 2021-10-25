import { createStore } from 'redux'
import produce from 'immer'

// state
const initialState = {
    username:null,
    userlogin: null,
    password: null,
    rememberMe: false
  }
 
// actions creators
export const loginUser = (userlogin, password, rememberMe, username) => ({
  type: 'login',
  payload: {
    userlogin: userlogin,
    password: password,
    rememberMe: rememberMe,
    username: username
  }
})

export const modifyUser = (username, userlogin, password) => ({
  type: 'modify',
  payload: {
    username: username,
    userlogin: userlogin,
    password: password,
  }
})

export const reset = () => ({ type: 'reset' })
  
function reducer(state = initialState, action) {
  if (action.type === 'login') {
    return produce(state, draft => {
      draft.userlogin = action.payload.userlogin
      draft.password = action.payload.password
      draft.rememberMe = action.payload.rememberMe
      draft.username = action.payload.username
    })
  }
  if (action.type === 'modify') {
    return produce(state, draft => {
      draft.username = action.payload.username
      draft.userlogin = action.payload.userlogin
      draft.password = action.payload.password
    })
  }
  if (action.type === 'reset') {
    return initialState
  }
  return state
}

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(reducer, reduxDevTools)

store.subscribe(() => console.log(store.getState()))