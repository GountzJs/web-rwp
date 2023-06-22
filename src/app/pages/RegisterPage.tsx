import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormRegister } from "../modules/user/forms/FormRegister";

export function RegisterPage() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Sign up — Conduit'
  }, [])

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>

            <p className="text-xs-center">
              <Link to={'/login'}>Have an account?</Link>
            </p>

            <ul className="error-messages">
              { errors.map(error => <li>{error}</li>) }
            </ul>

            <FormRegister setErrors={setErrors} />

          </div>
        </div>
      </div>
    </div>
  )
}