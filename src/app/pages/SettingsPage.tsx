import { useEffect, useState } from "react";
import { UnLoggedHook } from "../modules/shared/hooks/UnLoggedHook";
import { IUserSchema } from "../modules/shared/models/schemas/user.schema";
import { authenticationService } from "../modules/shared/services/authenticationService";
import { BtnLogOut } from "../modules/user/actions/BtnLogOut";
import { FormSettings } from "../modules/user/forms/FormSettings";
import { getUserService } from "../modules/user/services/getUserService";

export function SettingsPage() {
  const [user, setUser] = useState<IUserSchema>();
  const [errors, setErrors] = useState<string[]>([]);
  const unlogged = UnLoggedHook();

  useEffect(() => {
    document.title = 'Settings — Conduit'
  }, [])

  useEffect(() => {
    getUserService()
      .then((res) => {
        authenticationService(res.user);
        setUser(res.user);
      })
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
  }, [])

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ul className="error-messages">
              { errors.map((error, idx) => <li key={idx}>{error}</li>) }
            </ul>

            { user && <FormSettings user={user} setErrors={setErrors} /> }

            <hr />

            <BtnLogOut />
          </div>
        </div>
      </div>
    </div>
  )
}