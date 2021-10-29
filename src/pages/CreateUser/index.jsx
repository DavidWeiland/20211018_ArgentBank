import '../../utils/Style/main.css'
import { useState } from 'react'
import { useStore } from 'react-redux'
import { createUser} from '../../features/user'
import { useHistory } from 'react-router-dom'


export default function CreateUser() {
  const store = useStore()
  const history = useHistory()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
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

  function create() {
    const body = {
      email: email === '' ? null : email,
      password: password ==='' ? null : password,
      firstName:firstName,
      lastName:lastName
    }
  
    createUser(store, body)
    console.log(body)
    history.push('/login')
  }

  
  return (
    //(url === '/signup') ? (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>New User</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="firstname">firstname</label>
              <input type="text" id="firstname" name='FirstName' value={firstName} required onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">lastname</label>
              <input type="text" id="lastname" name='LastName' value={lastName} required onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">email</label>
              <input type="text" id="email" name='Email' value={email} required onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name='Password' value={password} required onChange={handleChange}/>
            </div>
            <button className="modify-button" onClick={() => create()}
            >
              Create
            </button>
          </form>
        </section>
      </main>
    /*) : (
      <Redirect push to={url} />
    )*/
  )
}