import '../../utils/Style/main.css'
import Logo from '../../assets/Images/argentBankLogo.png'
import { Link } from 'react-router-dom';


function Header() {

  const userSigned = true //envoyé par le store

  return (
    <nav class="main-nav">
      <Link class="main-nav-logo" to="/">
        <img
          class="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </Link>
      {(userSigned) ? (
        <div>
        <Link class="main-nav-item" to="/sign-in">
            <i class="fa fa-user-circle"></i>
            Sign In
        </Link>
      </div>
      ) : (
        <div>
        <Link class="main-nav-item" to="/user">
          <i class="fa fa-user-circle"></i>
          Tony
        </Link>
        <Link class="main-nav-item" to="/">
          <i class="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </div>
      )
      }
    </nav>
  );
}

export default Header;
