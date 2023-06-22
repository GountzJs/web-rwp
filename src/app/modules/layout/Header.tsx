import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from '../shared/redux/store';
import { Navbar } from "./navbars/Navbar";
import { NavbarLogin } from "./navbars/NavbarLogin";

export function Header() {
  const isLogin = useSelector((state: RootState) => state.auth.value);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={'/'} className="navbar-brand">
          conduit
        </Link>
        {
          isLogin
            ? <NavbarLogin />
            : <Navbar />
        }
      </div>
    </nav>
  )
}