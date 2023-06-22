import { useEffect, useState } from "react";
import { FormCreateArticle } from "../modules/article/forms/FormCreateArticle";

export function CreateArticlePage() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Editor — Conduit'
  }, [])

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              { errors.map((error, idx) => <li key={idx}>{error}</li>) }
            </ul>

            <FormCreateArticle setErrors={setErrors} />

          </div>
        </div>
      </div>
    </div>
  )
}