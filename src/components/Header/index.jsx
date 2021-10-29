import '../../utils/Style/main.css'
import Logo from '../../assets/Images/argentBankLogo.png'
import { Link, useLocation } from 'react-router-dom';
//import { useStore } from 'react-redux'
import {resetUser} from '../../features/user'


function Header() {
  const location = useLocation()
  //const store = useStore()

  //const firstName = store.getState().user.data.firstName
  const firstName = 'coucou'
  
  switch(location.pathname) {
    case '/login' :
      return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={Logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link className="main-nav-item" to="/newUser">
                <i className="fa fa-user-circle"></i>
                Sign Up
            </Link>
          </div>
        </nav>
      )
    case '/user' :
      return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={Logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
            <Link className="main-nav-item" onClick={() => resetUser()} to="/">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        </nav>
      )
    default:
      return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={Logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link className="main-nav-item" to="/login">
                <i className="fa fa-user-circle"></i>
                Sign In
            </Link>
          </div>
        </nav>
      )
  }
}

export default Header;
