import '../../utils/Style/main.css'
import Logo from '../../assets/Images/argentBankLogo.png'
import { Link } from 'react-router-dom';


function Header() {

  const userSigned = true //envoyé par le store

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
      {(userSigned) ? (
        <div>
        <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
        </Link>
      </div>
      ) : (
        <div>
        <Link className="main-nav-item" to="/user">
          <i className="fa fa-user-circle"></i>
          Tony
        </Link>
        <Link className="main-nav-item" to="/">
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
