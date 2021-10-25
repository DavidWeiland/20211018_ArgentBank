import '../../utils/Style/main.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../utils/store'
import { Redirect } from 'react-router'

export default function SignIn() {
  const [userlogin, setUserlog] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [redirect, setRedirect] = useState(false)
  
  const handleChange = ((e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = e.target.name
    name === 'RememberMe' ?
      setRememberMe(value)
      : (
        name === 'Userlogin' ?
          setUserlog(value)
          : setPassword(value)
      )
    
  })

  const username = (userlogin === "tony@stark.com") ? 'Tony Stark' :((userlogin === "steeve@rogers.com")?'Steeve Rogers' : null)
  
  const dispatch = useDispatch()

  const correctlogin = userlogin === '' ? null : userlogin
  const correctpwrd = password ==='' ? null : password
  
  return (

    (redirect && userlogin && password) ?
      (<Redirect push to='user'/>)
      : (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
          <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name='Userlogin' value={userlogin} onChange={handleChange}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='Password' value={password} onChange={handleChange}/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name='RememberMe' checked={rememberMe} onChange={handleChange}/>
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
                className="sign-in-button" onClick={() => {
                dispatch(loginUser(correctlogin, correctpwrd, rememberMe, username))
                setRedirect(true)
            }}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
    )
  )  
}