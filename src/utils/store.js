import { combineReducers, createStore } from 'redux'
import userReducer from '../features/user'


const reducer = combineReducers({
  user: userReducer,
})

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(reducer, reduxDevTools)