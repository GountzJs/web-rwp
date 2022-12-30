import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserHook } from "../../../hooks/GetUserHook";

export function NavbarUser() {
  const [ user, setUser ] = useState();
  const getUser = GetUserHook({ setUser });

  useEffect(() => {
    getUser();
  }, [])

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
            <Link to={'/editor'} className={`nav-link ${getLocation() === '/editor' && 'active'}`}><i className="ion-compose"></i>&nbsp;New Article</Link>
          </li>
          <li className="nav-item">
            <Link to={'/settings'} className={`nav-link ${getLocation() === '/settings' && 'active'}`}> <i className="ion-gear-a"></i>&nbsp;Settings</Link>
          </li>
          <li className="nav-item">
            <Link to={`/profile/${user?.username}`} className={`nav-link ${getLocation() === '/profile/' + user?.username && 'active'}`}>
              <img src={user?.image} className="user-pic" alt="" />&nbsp;{ user?.username }
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}