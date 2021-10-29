import '../../utils/Style/main.css'
import { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import { getOrModifyUser } from '../../utils/callMethod/User'


function User() {
  const userInfos = useSelector(selectUser)

  const firstName = userInfos.data?.firstName
  const lastName = userInfos.data?.lastName
    
  const store = useStore()
  const history = useHistory()
  
  const token = userInfos.auth?.token
  useEffect(() => {
    const method = 'post'
    const path = '/profile'
    const body = {}
    getOrModifyUser(store, method, path, body, token)
  }, [store, token])

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br /> {firstName} {lastName} !</h1>
        <button className="edit-button" onClick={()=>history.push('/profile')}>Edit Name</button>
      </div>
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

export default User