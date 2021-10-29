import '../../utils/Style/main.css'
import { useState } from 'react'
import { useStore } from 'react-redux'
import {UpdateUser} from '../../features/user'
//import { Redirect } from 'react-router'


export default function ModifyUser() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  //const [url, setUrl] = useState('/login')

  const handleChange = ((e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = e.target.name
    switch (name) {
      case 'Email':
        setEmail(value)
        break
      case 'Password':
        setPassword(value)
        break
      case 'FirstName':
        setFirstName(value)
        break
      case 'LastName':
        setLastName(value)
        break
      default:
    }
  })
  
  const store = useStore()

  
  function modify() {
    
  const body = {
    email: email === '' ? null : email,
    password: password ==='' ? null : password,
    firstName:firstName,
    lastName:lastName
  }
  const token = store.getState().user.data.token
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  UpdateUser(store, body, config)
}
  
console.log(store.getState().user)
  
  return (
    //(url === '/login' || url === '/signup') ? (
      <main className="main bg-dark">
          <section className="sign-in-content">
              <i className="fa fa-user-circle sign-in-icon"></i>
              <h1>Modify User</h1>
              <form>
                <div className="input-wrapper">
                  <label htmlFor="firstname">firstname</label>
                  <input type="text" id="firstname" name='FirstName' value={firstName} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastname">lastname</label>
                  <input type="text" id="lastname" name='LastName' value={lastName} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="email">email</label>
                  <input type="text" id="email" name='Email' value={email} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name='Password' value={password} onChange={handleChange}/>
                </div>
                <button
                  className="modify-button" onClick={() => modify()}
                >
                  Modify
                </button>
              </form>
          </section>
      </main>
    /*) : (
      <Redirect push to={url} />
    )*/
  )
}