import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  const hasRoute = (path: string) => {
    return decodeURI(location.pathname) === path ? 'active' : '';
  }

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to={'/'} className={`nav-link ${hasRoute('/')}`}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to={'/login'} className={`nav-link ${hasRoute('/login')}`}>
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link to={'/register'} className={`nav-link ${hasRoute('/register')}`}>
          Sign up
        </Link>
      </li>
    </ul>
  )
}