import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../shared/redux/store";

export function NavbarLogin() {
  const user = useSelector((state: RootState) => state.user.value);
  const location = useLocation();

  const hasRoute = (path: string) => {
    if(path === `/profile/${user.username}`) {
      return decodeURI(location.pathname).includes(`/profile/${user.username}`) ? 'active' : '';
    }
    else if(path.includes('/editor') && location.pathname.includes('/editor')) return 'active';
    return location.pathname === path ? 'active' : '';
  }

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to={'/'} className={`nav-link ${hasRoute('/')}`}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to={'/editor'} className={`nav-link ${hasRoute('/editor')}`}>
          <i className="ion-compose"></i>&nbsp;New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link to={'/settings'} className={`nav-link ${hasRoute('/settings')}`}>
          <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/${user.username}`} className={`nav-link ${hasRoute(`/profile/${user.username}`)}`}>
          {
            user.image &&
            <img 
              src={user.image}
              className="user-pic"
            />
          }
          { user.username }
        </Link>
      </li>
    </ul>
  )
}