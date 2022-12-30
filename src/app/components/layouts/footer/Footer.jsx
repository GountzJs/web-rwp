import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <div className="container">
        <NavLink to={'/'}  className="logo-font">conduit</NavLink>
        <span className="attribution">
          An interactive learning project from <NavLink to={'/'}  className="logo-font">Thinkster</NavLink>. Code &amp;
          design licensed under MIT.
        </span>
      </div>
    </footer>
  )
}