import { Link } from "react-router-dom";

export function Navbar() {
  const getLocation = () => {
    return window.location.pathname;
  }

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={'/'} className="navbar-brand">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to={'/'} className={`nav-link ${getLocation() === '/' && 'active'}`}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to={'/login'} className={`nav-link ${getLocation() === '/login' && 'active'}`}>Sign in</Link>
          </li>
          <li className="nav-item">
            <Link to={'/register'} className={`nav-link ${getLocation() === '/register' && 'active'}`}>Sign up</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}