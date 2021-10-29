import '../../utils/Style/main.css'
import { useState } from 'react'
import { useStore } from 'react-redux'
import { authorizeUser } from '../../features/user'
import { Link, useHistory } from 'react-router-dom'

export default function SignIn() {
  const store = useStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
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

  const history = useHistory()

  function connection() {
    const body = {
      email: email,
      password:password
    }
    authorizeUser(store, body)
    console.log(store.getState().auth.data.token)
    history.push('/user')
  }
  
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
          <form>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input type="text" id="email" name='Email' value={email} onChange={handleChange}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='Password' value={password} onChange={handleChange}/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name='RememberMe' checked={rememberMe} onChange={handleChange}/>
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" onClick={() => { connection() }}
          >
            Sign In
          </button>
          <Link className="main-nav-item" to="/newUser">
            Or click here to create an account
        </Link>
        </form>
      </section>
    </main>
  )  
}