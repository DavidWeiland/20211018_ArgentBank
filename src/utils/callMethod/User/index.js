import axios from 'axios'
import { baseUrl } from '../../data'
import { selectUser } from '../../selectors'
import { userAuthorized, userFetching, userRejected, userResolved } from '../../../features/user'

/**
 * @async
 * @function getOrModifyUser
 * @param { Object } store
 * @param { String } method 
 * @param { String } path 
 * @param { Object } body 
 * @param { String } token 
 * @returns action in reducer to change store (post) or database (put)
 */

export async function getOrModifyUser(store, method, path, body, token) {
  const status = selectUser(store.getState()).status
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  if (status === 'pending' || status === 'updating') {
    return 
  }
  store.dispatch(userFetching())
  try {
    const response = await axios({method:method, url:`${baseUrl}/user${path}`, data:body, headers:headers})
    const responseData = await response.data.body
    if (path === '/login') {
      (store.dispatch(userAuthorized(responseData)))
    } else {
      (store.dispatch(userResolved(responseData)))
    }
  }
  catch (error) {
    store.dispatch(userRejected(error))
  }
}