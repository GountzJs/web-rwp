import { useState } from "react";
import { Footer } from "../../../components/layouts/footer/Footer";
import { NavbarUser } from "../../../components/layouts/header/NavbarUser";
import { FormArticle } from "./FormArticle";

export function CreateArticle() {
  const [ errors, setErrors ] = useState([]);
  return (
    <>
      <NavbarUser />
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ul className="error-messages">
                { errors.map((err, index) => <li key={index}>{ err }</li>) }
              </ul>
              <FormArticle setErrors={setErrors} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}