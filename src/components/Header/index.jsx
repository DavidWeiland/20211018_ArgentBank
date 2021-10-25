import '../../utils/Style/main.css'
import Logo from '../../assets/Images/argentBankLogo.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {reset} from '../../utils/store'


function Header() {
  
  const username = useSelector((state) => state.username)
  const dispatch = useDispatch()

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
      {(!username) ? (
        <div>
        <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
        </Link>
      </div>
      ) : (
        <div>
        <Link className="main-nav-item" to="/profile">
          <i className="fa fa-user-circle"></i>
          {username.split(' ')[0]}
        </Link>
        <Link className="main-nav-item" onClick={() => dispatch(reset())} to="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </div>
      )
      }
    </nav>
  );
}

export default Header;
