import '../../utils/Style/main.css'
//import { useEffect } from 'react'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import { getOrModifyUser } from '../../utils/callMethod/User'
import { Loader } from '../../utils/Style/Loader'


export default function Profile() {
  const userInfos = useSelector(selectUser)

  const firstName = userInfos.data?.firstName
  const lastName = userInfos.data?.lastName

  const [editName, setEditName] = useState(false)

  const store = useStore()

  const [firstNameState, setFirstNameState] = useState('')
  const [lastNameState, setLastNameState] = useState('')
  
  const handleChange = ((e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = e.target.name
    if (name === 'FirstName') {
      setFirstNameState(value)
    }
    if (name === 'LastName') {
      setLastNameState(value)
    }
  })

  const handleEdit = (() => {
    setFirstNameState(firstName)
    setLastNameState(lastName)
    setEditName(!editName)
  })

  const  cancel = (() => {
    setFirstNameState(firstName)
    setLastNameState(lastName)
    handleEdit()
  })

  /* logique à conserver pour appel transactions
  const token = userInfos.auth?.token
  useEffect(() => {
    const method = 'post'
    const path = '/profile'
    const body = {}
    getOrModifyUser(store, method, path, body, token)
  }, [store, token]) */

  const modify = (()=> {
    const method = 'put'
    const path = '/profile'
    const body = {
      firstName:firstNameState,
      lastName:lastNameState
    }
    const token = userInfos.auth?.token
    getOrModifyUser(store, method, path, body, token)
    handleEdit()
  })

  const status = userInfos.status

  if (status === 'pending' || status === 'updating' || status === 'authorized') {
    return (
      <main className="main bg-dark">
        <Loader />
      </main>
    )
  }

  if (status === 'rejected') {
    return (
      <Redirect to="/login"/>
    )
  }

  return (
    <main className="main bg-dark">
      {(editName === true) ? (
        <div className="header">
          <h1>Welcome back<br />
          
          <form>
            <div className='form-changing-wrapper'>
              <div className="input-changing-wrapper">
                <input type="text" id="firstname" name='FirstName' value={firstNameState} onChange={handleChange}/>
              </div>
              <div className="input-changing-wrapper">
                <input type="text" id="lastname" name='LastName' value={lastNameState} onChange={handleChange}/>
              </div>
            </div>
            </form>
            </h1>
            <button className="modify-button" onClick={modify}>
                Save
            </button>
            <button className="modify-button" onClick={cancel}>
                Cancel
            </button>
          
        </div>
      ):(
        <div className="header">
          <h1>Welcome back<br /> {firstName} {lastName} !</h1>
          <button className="edit-button" onClick={handleEdit}>Edit Name</button>
        </div>
      )}
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}