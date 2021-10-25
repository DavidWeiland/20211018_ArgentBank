import '../../utils/Style/main.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modifyUser } from '../../utils/store'
import { Redirect } from 'react-router'

export default function SignIn() {
  const stateLogin = useSelector((state) => state.userlogin)
  const statePassword = useSelector((state) => state.password)
  const stateName = useSelector((state) => state.username)
  const [userlogin, setUserlog] = useState(stateLogin)
  const [password, setPassword] = useState(statePassword)
  const [username, setUsername] = useState(stateName)

  const [redirect, setRedirect] = useState(false)
  
  const handleChange = ((e) => {
    const target = e.target
    const value = target.value
    const name = e.target.name
    if (name === 'UserLogin') {
      setUserlog(value)
    }
    if (name === 'Password') {
      setPassword(value)
    }
    if (name === 'Username') {
      setUsername(value)
    }
  })
  
  const dispatch = useDispatch()
    
  return (

    (redirect) ?
      (<Redirect push to='user'/>)
      : (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Profile</h1>
          <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name='Username' value={username} onChange={handleChange}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="userlogin">Userlogin</label>
            <input type="text" id="userlogin" name='Userlogin' value={userlogin} onChange={handleChange}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='Password' value={password} onChange={handleChange}/>
          </div>
          <button
                className="modify-button" onClick={() => {
                dispatch(modifyUser(username, userlogin, password))
                setRedirect(true)
            }}
          >
            Modify Profile
          </button>
        </form>
      </section>
    </main>
    )
  )  
}