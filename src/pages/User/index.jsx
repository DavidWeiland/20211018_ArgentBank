import '../../utils/Style/main.css'
//import { useEffect, useState } from 'react'
//import { useHistory } from 'react-router'
//import { useStore } from 'react-redux'
//import { getOrModifyUser } from '../../features/user'

function User() {
  //const store = useStore()
  //const history = useHistory()

  /* useEffect(() => {
    getOrModifyUser(store, { method: 'post' })
    console.log(connexion)
  }, [store])
 */
  //console.log(store.getState().user.data.firstName)
  
  /* if (store.getState().auth.status !== 'authorized') {
    history.push('/user')
  } else {} */

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br /> ici le nom !</h1>
        <button className="edit-button">Edit Name</button>
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