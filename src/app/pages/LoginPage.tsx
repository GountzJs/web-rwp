import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormLogin } from "../modules/user/forms/FormLogin";

export function LoginPage() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Sign in — Conduit'
  }, [])

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>

            <p className="text-xs-center">
              <Link to={'/register'}>Need an account?</Link>
            </p>

            <ul className="error-messages">
              { errors.map((error, idx) => <li key={idx}>{error}</li>) }
            </ul>

            <FormLogin setErrors={setErrors} />

          </div>
        </div>
      </div>
    </div>  
  )
}