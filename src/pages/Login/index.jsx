import '../../utils/Style/main.css'
import { useState } from 'react'
import { useStore } from 'react-redux'
import { getOrModifyUser } from '../../utils/callMethod/User'
import { useHistory } from 'react-router-dom'

/**
 * Login page of the application
 * 
 * @returns { ReactElement }
 */
export default function Login() {
  const store = useStore()
  const history = useHistory()

/**
 * State to view inputs
 */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

/**
 * Change the state
 * @function handleChange
 * @param { Object } e event
 * @param { String } value firstName or lastName from form
 * @param { Boolean } value rememberMe from form
 */
  const handleChange = ((e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = e.target.name
    name === 'RememberMe' ?
      setRememberMe(value)
      : (
        name === 'Email' ?
          setEmail(value)
          : setPassword(value)
      )
  })

/**
   * Authentification of the user entered in the connection form
   * @function getToken
   * @param { Object } store with status 'rejected' after first useEffect fails
   * @param { String } email from form
   * @param { String } password from form
   * @param { Boolean } rememberMe from form
   * 
   * if email and password correspond to a registered user in database
   * @returns { Object } store with token and status 'resolved' and push to profile page
   * 
   * if email or passaword is empty or if email or password doesn't corresponds to a registered user in database
   * @return { Object } store with status 'rejected' and push to profile page
   */
  const getToken = (() => {
    const method = 'post'
    const path = '/login'
    const body = {
      email: email,
      password: password,
    }

    /**
     * this allows to save email and password in locaStorage for an automatic connection event after closing the browser */
    if (rememberMe === true) {
      localStorage.setItem('localEmail', email)
      localStorage.setItem('localPassword', password)
    }
    const token = ''
    getOrModifyUser(store, method, path, body, token)
    history.push('/profile')
  })
  
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
          <form>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              name='Email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name='Password'
              value={password}
              onChange={handleChange}  
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              name='RememberMe'
              checked={rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            onClick={getToken}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  )  
}