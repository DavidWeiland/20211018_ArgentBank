import '../../utils/Style/main.css'
//import { Link } from 'react-router-dom';
import React from 'react'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      Password: '',
      Checked: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    alert(JSON.stringify(this.state)) // change for link to axios.post(localhost:3001...)
    window.location.href='/user' //link in axios.post too after validation
    e.preventDefault()
  }

  render() {
    const { Name, Password, Checked } = this.state
    
    return (
      <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name='Name' value={Name} onChange={this.handleChange}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='Password' value={Password} onChange={this.handleChange}/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name='Checked' checked={Checked} onChange={this.handleChange}/>
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* <Link to="/user" className="sign-in-button">Sign In</Link> */}
          <input type="submit" className="sign-in-button" value="Sign In" />
        </form>
      </section>
    </main>
  );
  }
}