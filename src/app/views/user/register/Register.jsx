import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Footer, Navbar } from '@/app/components';
import { FormRegister } from "./FormRegister";

export function Register() {
  const [ errors, setErrors ] = useState([]);

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <NavLink to={'/login'}>Have an account?</NavLink>
              </p>

              <ul className="error-messages">
                { errors.map((err, index) => <li key={index}>{ err }</li>) }
              </ul>

              <FormRegister setErrors={setErrors} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}