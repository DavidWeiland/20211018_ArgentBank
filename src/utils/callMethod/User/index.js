import axios from 'axios'
import { baseUrl } from '../../data'
import { selectUser } from '../../selectors'
import { userAuthorized, userFetching, userRejected, userResolved } from '../../../features/user'

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