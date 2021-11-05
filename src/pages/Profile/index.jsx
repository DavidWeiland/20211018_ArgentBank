import '../../utils/Style/main.css'
//import { useEffect } from 'react' (reserved for transactions call)
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import { getOrModifyUser } from '../../utils/callMethod/User'
import { Loader } from '../../utils/Style/Loader'

/**
 * Profile page of the application
 * 
 * @returns { ReactElement }
 */
export default function Profile() {
  const userInfos = useSelector(selectUser)
  const firstName = userInfos.data?.firstName
  const lastName = userInfos.data?.lastName
  
  /**
   * displays form to modify informations
   */
  const [editName, setEditName] = useState(false)

  const store = useStore()

  /**
   * State to view inputs
   */
  const [firstNameState, setFirstNameState] = useState('')
  const [lastNameState, setLastNameState] = useState('')
  
  /**
   * Change the state
   * @function handleChange
   * @param { Object } e event
   * @param { String } value firstName or lastName from form
   */
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

  /**
   * Default appearance of the state before changing
   * and open or close form (toggle)
   * @function handleEdit
   * @param { String } firstName from store
   * @param { String } lastName from store
   */
  const handleEdit = (() => {
    setFirstNameState(firstName)
    setLastNameState(lastName)
    setEditName(!editName)
  })

  /* logic to be retained for transactions call

  const token = userInfos.auth?.token
  useEffect(() => {
    const method = 'post'
    const path = '' (note: in call need replace '/user/' by '/transactions/' or new callMethod)
    const body = {}
    getOrModifyUser(store, method, path, body, token)
  }, [store, token])
  */

  /**
   * Modifies the user's informations entered in the database
   * @function modify
   * @param { Object } store with status 'resolved'
   * @param { String } firstName from form
   * @param { String } lastName from form
   * 
   * @returns { Object } store with updated user's informations and status 'resolved'
   */
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

  /**
   * Needs store.status to change appearance
   */
  const status = userInfos.status

  /**
   * displays the loader
   */
  if (status === 'pending' || status === 'updating' || status === 'authorized') {
    return (
      <main className="main bg-dark">
        <Loader />
      </main>
    )
  }

  /**
   * push to login page
   */
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
            <button className="modify-button" onClick={handleEdit}>
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