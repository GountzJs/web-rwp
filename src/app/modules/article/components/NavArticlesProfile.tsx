import { Link, useLocation, useParams } from "react-router-dom";

export function NavArticlesProfile() {
  const { username } = useParams();
  const location = useLocation();

  const hasRoute = (path: string) => {
    return decodeURI(location.pathname) === path ? 'active' : '';
  }

  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link 
            to={`/profile/${username}`} 
            className={`nav-link ${hasRoute(`/profile/${username}`)}`}
          >
            My Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to={`/profile/${username}/favorites`} 
            className={`nav-link ${hasRoute(`/profile/${username}/favorites`)}`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    </div>
  )
}