import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Footer } from '../../../components/layouts/footer/Footer';
import { Navbar } from '../../../components/layouts/header/Navbar';
import { FormLogin } from "./FormLogin";

export function Login() {
  const [ errors, setErrors ] = useState([]);

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <NavLink to={'/register'}>Need an account?</NavLink>
              </p>

              <ul className="error-messages">
                { errors.map((err, index) => <li key={index}> {err} </li>) }
              </ul>
              <FormLogin setErrors={setErrors} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}