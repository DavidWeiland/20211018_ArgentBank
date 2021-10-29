import '../../utils/Style/main.css'
import { useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import {getOrModifyUser} from '../../utils/callMethod/User'
import { useHistory } from 'react-router-dom'

export default function Profile() {
  const userInfos = useSelector(selectUser)

  const firstNameStore = userInfos.data?.firstName
  const lastNameStore = userInfos.data?.lastName
  const emailStore = userInfos.data?.email
    
  const store = useStore()
  

  const [firstName, setFirstName] = useState(firstNameStore)
  const [lastName, setLastName] = useState(lastNameStore)
  
  const [password, setPassword] = useState('')

  const handleChange = ((e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = e.target.name
    switch (name) {
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

  const history = useHistory()
  
  function createOrModify(path, location) {
    const method = 'put'
    const body = {
      email: emailStore,
      password: password ==='' ? null : password,
      firstName:firstName,
      lastName:lastName
    }
    console.log(body)
    const token = userInfos.auth?.token
    getOrModifyUser(store, method, path, body, token)
    history.push(location)
}
  
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Profile</h1>
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
            <input type="text" id="email" name='Email' value={emailStore} onChange={handleChange}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='Password' value={password} onChange={handleChange}/>
          </div>
          {(userInfos.data.id) ? (
            <button className="modify-button" onClick={() => createOrModify('/profile', '/user')}>
              Modify
            </button>
          ) : (
            <button className="sign-in-button" onClick={() => createOrModify('/signup', '/login')}>
              Create
            </button>
          )}
        </form>
      </section>
    </main>
  )
}