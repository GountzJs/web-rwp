import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, NavbarUser } from '@/app/components';
import { LocalStorageService } from "@/app/core";
import { FormSettings } from "./FormSettings";

export function Settings() {
  const [ errors, setErrors ] = useState([]);
  const { logOut } = LocalStorageService();
  const navigate = useNavigate();

  const closeSession = () => {
    logOut();
    navigate('/');
  }

  return (
    <>
      <NavbarUser />
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ul className="error-messages">
                { errors.map((err, index) => <li key={index}>{ err }</li>) }
              </ul>

              <FormSettings setErrors={setErrors}/>
              <hr />
              <button type="button" className="btn btn-outline-danger" onClick={closeSession}>Or click here to logout.</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}