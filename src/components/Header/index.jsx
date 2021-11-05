import '../../utils/Style/main.css'
import Logo from '../../assets/Images/argentBankLogo.png'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useStore} from 'react-redux'
import { selectUser } from '../../utils/selectors'
import { getOrModifyUser } from '../../utils/callMethod/User'
import { userReset } from '../../features/user'

/**
 * Header of the application
 * 
 * @returns { ReactElement }
 */
export default function Header() {

  const store = useStore()
  const email = localStorage.getItem('localEmail')
  const password = localStorage.getItem('localPassword')

  /**
   * Both useEffects allow automatic connection
   */

  /**
   * Authentification of the user registered in the localStorage
   * @function useEffect
   * @param { Object } store INIT with status 'void'
   * @param { String } email from localStorage
   * @param { String } password from localStorage
   * 
   * if email and password are differents from null and if email and password correspond to a registered user in database
   * @returns { Object } store with token and status 'resolved'
   * 
   * if email or passaword is empty or if email or password doesn't corresponds to a registered user in database
   * @return { Object } store with status 'rejected'
   */
  useEffect(() => {
    const method = 'post'
    const path = '/login'
    const body = {
      email: email,
      password: password,
    }
    const token = ''
    getOrModifyUser(store, method, path, body, token)
  }, [store, email, password])

  const userInfos = useSelector(selectUser)
  const firstName = userInfos.data?.firstName
  const token = userInfos.auth?.token
  
  /**
   * Connect the user registered in database
   * @function useEffect
   * @param { Object } store
   * @param { String } token from store
   * 
   * If first useEffect or function connection()(see login.jsx) returns a store with status 'resolved' and a token
   * @returns { Object } store with user's informations and status 'resolved'
   * 
   * If first useEffect or function connection()(see login.jsx) returns a store with status 'rejected' and without token
   * @returns { Object } store with status 'rejected'
   */

  useEffect(() => {
    const method = 'post'
    const path = '/profile'
    const body = {}
    getOrModifyUser(store, method, path, body, token)
  }, [store, token])  
  
  /**
   * Needs store.status to change appearance
   */
  const status = userInfos.status

  /**
   * Logs out the connected user and empties localStorage
   */

  const signout = (() => {
    localStorage.removeItem('localEmail')
    localStorage.removeItem('localPassword')
    store.dispatch(userReset())
  })
      return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={Logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          {(status==='resolved') ? (
            <div>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
            <Link className="main-nav-item"  to="/" onClick={signout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
          ) : (
          <div>
            <Link className="main-nav-item" to="/login">
                <i className="fa fa-user-circle"></i>
                Sign In
            </Link>
          </div>
          )}
        </nav>
      )
}