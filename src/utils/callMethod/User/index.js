import axios from 'axios'
import { baseUrl } from '../../data'
import { selectUser } from '../../selectors'
import * as userActions from '../../../features/user'

export function getOrModifyUser(method, path, body, token) {
  return async (dispatch, getState) => {
    const status = selectUser(getState()).status
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    if (status === 'pending' || status === 'updating'){
      return 
    }
    dispatch(userActions.fetching())
    try {
      const response = await axios({method:method, url:`${baseUrl}/user${path}`, data:body, headers:headers})
      const responseData = await response.data.body
      if (path === '/login') {
        (dispatch(userActions.authorized(responseData)))
      } else {
        (dispatch(userActions.resolved(responseData)))
      }
    }
    catch (error) {
      dispatch(userActions.rejected(error))
    }
  }
}